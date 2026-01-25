'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'
import { isValidEmail, isValidPhone } from '@/lib/utils'

const projectTypes = [
  { value: 'website', label: 'Website' },
  { value: 'webapp', label: 'Web App / Portal' },
  { value: 'automation', label: 'Automation / AI' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'other', label: 'Other / Not Sure' },
]

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-35k', label: '$15,000 - $35,000' },
  { value: '35k-75k', label: '$35,000 - $75,000' },
  { value: 'over-75k', label: '$75,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible' },
]

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  project_type: string
  budget_range: string
  timeline: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  project_type?: string
  budget_range?: string
  timeline?: string
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.project_type) {
      newErrors.project_type = 'Please select a project type'
    }

    if (!formData.budget_range) {
      newErrors.budget_range = 'Please select a budget range'
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Please select a timeline'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name.trim(),
            company: formData.company.trim() || null,
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            project_type: formData.project_type,
            budget_range: formData.budget_range,
            timeline: formData.timeline,
            message: formData.message.trim() || null,
            status: 'new',
          },
        ])

      if (error) throw error

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card padding="lg" className="text-center">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-title font-semibold mb-4">Thanks for reaching out!</h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve received your project details and will get back to you within 24 hours.
          </p>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </Card>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Info */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                errors.name ? 'border-red-500' : 'border-border'
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors"
              placeholder="Your company (optional)"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                errors.email ? 'border-red-500' : 'border-border'
              }`}
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Project Details</h2>

        <div>
          <label htmlFor="project_type" className="block text-sm font-medium mb-2">
            What do you need? <span className="text-red-500">*</span>
          </label>
          <select
            id="project_type"
            name="project_type"
            value={formData.project_type}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors appearance-none ${
              errors.project_type ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.project_type && (
            <p className="text-red-500 text-sm mt-1">{errors.project_type}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget_range" className="block text-sm font-medium mb-2">
              Budget Range <span className="text-red-500">*</span>
            </label>
            <select
              id="budget_range"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors appearance-none ${
                errors.budget_range ? 'border-red-500' : 'border-border'
              }`}
            >
              <option value="">Select budget</option>
              {budgetRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            {errors.budget_range && (
              <p className="text-red-500 text-sm mt-1">{errors.budget_range}</p>
            )}
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium mb-2">
              Timeline <span className="text-red-500">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors appearance-none ${
                errors.timeline ? 'border-red-500' : 'border-border'
              }`}
            >
              <option value="">Select timeline</option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.timeline && (
              <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Tell us more about your project
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground transition-colors resize-none"
            placeholder="Describe what you're looking to build, any specific requirements, or questions you have..."
          />
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit Request'}
      </Button>

      <p className="text-sm text-muted-foreground">
        By submitting this form, you agree to our privacy policy. 
        We&apos;ll only use your information to respond to your inquiry.
      </p>
    </form>
  )
}
