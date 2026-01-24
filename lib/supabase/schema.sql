-- TechBridge Supabase Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  file_url TEXT,
  notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read leads
CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Anyone can insert leads (for the public form)
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update leads
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete leads
CREATE POLICY "Authenticated users can delete leads" ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for file uploads (optional)
-- Run this separately in Supabase Dashboard > Storage
-- INSERT INTO storage.buckets (id, name, public) VALUES ('lead-files', 'lead-files', false);

-- Storage policy for lead files
-- CREATE POLICY "Anyone can upload lead files" ON storage.objects
--   FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (bucket_id = 'lead-files');

-- CREATE POLICY "Authenticated users can read lead files" ON storage.objects
--   FOR SELECT
--   TO authenticated
--   USING (bucket_id = 'lead-files');
