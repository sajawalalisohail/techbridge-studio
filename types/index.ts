// Lead types for Supabase
export interface Lead {
  id: string
  created_at: string
  name: string
  company: string
  email: string
  phone: string
  project_type: string
  budget_range: string
  timeline: string
  message: string
  status: LeadStatus
  file_url?: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'

export interface LeadFormData {
  name: string
  company: string
  email: string
  phone: string
  project_type: string
  budget_range: string
  timeline: string
  message: string
  file?: File
}

// Service types
export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  priceRange: string
  icon: string
}

// Project types
export interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  tags: string[]
  link?: string
}

// Process step types
export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  details: string[]
}

// FAQ types
export interface FAQItem {
  id: string
  question: string
  answer: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
}
