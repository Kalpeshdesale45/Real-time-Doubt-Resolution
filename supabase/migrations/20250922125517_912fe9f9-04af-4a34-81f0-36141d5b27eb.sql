-- Enable RLS on any tables that don't have it
-- This fixes the security linter warnings

-- Enable RLS on groups table if not already enabled
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'groups' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Enable RLS on meetings table if not already enabled  
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'meetings' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;