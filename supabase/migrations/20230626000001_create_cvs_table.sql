-- Create cvs table
CREATE TABLE IF NOT EXISTS cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create unique index on user_id and title
CREATE UNIQUE INDEX IF NOT EXISTS cvs_user_title_idx ON cvs(user_id, title);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS cvs_user_id_idx ON cvs(user_id);

-- Set up row level security
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can insert own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;

-- Create policy to allow users to read their own CVs
CREATE POLICY "Users can view own CVs" 
  ON cvs FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own CVs
CREATE POLICY "Users can insert own CVs" 
  ON cvs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own CVs
CREATE POLICY "Users can update own CVs" 
  ON cvs FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own CVs
CREATE POLICY "Users can delete own CVs" 
  ON cvs FOR DELETE 
  USING (auth.uid() = user_id);

-- Create or replace the function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS update_cvs_updated_at ON cvs;

-- Create the trigger
CREATE TRIGGER update_cvs_updated_at
BEFORE UPDATE ON cvs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
