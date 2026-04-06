-- Create leads table for Neon PostgreSQL
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL,
  name VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company_name VARCHAR(255),
  team_size VARCHAR(50),
  zip_code VARCHAR(20),
  main_issue TEXT,
  computer_type VARCHAR(100),
  device_type VARCHAR(100),
  work_location VARCHAR(100),
  start_time VARCHAR(100),
  message TEXT,
  security_concerns TEXT,
  has_security_team TEXT,
  sensitive_data_access TEXT,
  security_incidents TEXT,
  compliance_requirements TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_form_type ON leads(form_type);
