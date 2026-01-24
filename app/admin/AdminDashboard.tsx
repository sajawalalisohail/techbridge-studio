'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Section, Card, Button } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'
import { formatRelativeTime, getStatusColor } from '@/lib/utils'
import type { Lead, LeadStatus } from '@/types'

interface AdminDashboardProps {
  initialLeads: Lead[]
  userEmail: string
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed']

export default function AdminDashboard({ initialLeads, userEmail }: AdminDashboardProps) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setIsUpdating(true)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId)

      if (error) throw error

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ))
      
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus })
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter)

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    closed: leads.filter(l => l.status === 'closed').length,
  }

  return (
    <Section className="pt-24 pb-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-headline-sm font-semibold">Leads Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Signed in as {userEmail}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <Card hover={false} className="text-center">
            <p className="text-2xl font-semibold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </Card>
          <Card hover={false} className="text-center">
            <p className="text-2xl font-semibold text-blue-600">{stats.new}</p>
            <p className="text-sm text-muted-foreground">New</p>
          </Card>
          <Card hover={false} className="text-center">
            <p className="text-2xl font-semibold text-yellow-600">{stats.contacted}</p>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </Card>
          <Card hover={false} className="text-center">
            <p className="text-2xl font-semibold text-green-600">{stats.qualified}</p>
            <p className="text-sm text-muted-foreground">Qualified</p>
          </Card>
          <Card hover={false} className="text-center">
            <p className="text-2xl font-semibold text-gray-600">{stats.closed}</p>
            <p className="text-sm text-muted-foreground">Closed</p>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', ...statusOptions] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status
                  ? 'bg-foreground text-background'
                  : 'bg-muted hover:bg-border'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Leads Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Leads List */}
          <div className="space-y-4">
            {filteredLeads.length === 0 ? (
              <Card hover={false}>
                <p className="text-center text-muted-foreground py-8">
                  No leads found.
                </p>
              </Card>
            ) : (
              filteredLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className={`cursor-pointer ${
                    selectedLead?.id === lead.id ? 'ring-2 ring-foreground' : ''
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{lead.name}</h3>
                      {lead.company && (
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{lead.email}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{lead.project_type}</span>
                    <span>{formatRelativeTime(lead.created_at)}</span>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Lead Detail */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedLead ? (
              <Card padding="lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-title font-semibold">{selectedLead.name}</h2>
                    {selectedLead.company && (
                      <p className="text-muted-foreground">{selectedLead.company}</p>
                    )}
                  </div>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    disabled={isUpdating}
                    className={`text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer ${getStatusColor(selectedLead.status)}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${selectedLead.email}`} className="text-foreground hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  
                  {selectedLead.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href={`tel:${selectedLead.phone}`} className="text-foreground hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                      <p className="font-medium">{selectedLead.project_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Budget</p>
                      <p className="font-medium">{selectedLead.budget_range}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="font-medium">{selectedLead.timeline}</p>
                    </div>
                  </div>

                  {selectedLead.message && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Message</p>
                      <p className="text-foreground whitespace-pre-wrap">{selectedLead.message}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                    <p className="text-foreground">
                      {new Date(selectedLead.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    href={`mailto:${selectedLead.email}`}
                    size="sm"
                    className="flex-1"
                  >
                    Send Email
                  </Button>
                  {selectedLead.phone && (
                    <Button
                      href={`tel:${selectedLead.phone}`}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Call
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <Card hover={false} className="text-center py-16">
                <p className="text-muted-foreground">
                  Select a lead to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
