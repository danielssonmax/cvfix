-- Create premium table
CREATE TABLE IF NOT EXISTS premium (
  id BIGSERIAL PRIMARY KEY,
  uid UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  premium BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on uid for faster lookups
CREATE INDEX IF NOT EXISTS premium_uid_idx ON premium(uid);

-- Set up row level security
ALTER TABLE premium ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own premium status
CREATE POLICY "Users can view own premium status" 
  ON premium FOR SELECT 
  USING (auth.uid() = uid);

-- Create policy to allow service role to insert and update premium status
CREATE POLICY "Service role can manage premium status" 
  ON premium FOR ALL 
  USING (auth.role() = 'service_role');

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before each update
CREATE TRIGGER update_premium_updated_at
BEFORE UPDATE ON premium
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
