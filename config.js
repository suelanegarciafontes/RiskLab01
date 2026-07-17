

const SUPABASE_URL = "https://kewmaegxvrzkbylsjfjf.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtld21hZWd4dnJ6a2J5bHNqZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNDUyMTgsImV4cCI6MjA5OTgyMTIxOH0.bjdpoT7xIJ06K3j1E2VRS_6_8rqIkNTUTz5BXVaMuqU"
};

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
