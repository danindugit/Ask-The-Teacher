import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lerenrdkevxavfrctiiz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcmVucmRrZXZ4YXZmcmN0aWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY5OTAsImV4cCI6MjA3Njg5Mjk5MH0.EswqHmwUfAeidxx2YFPy32uLIx9cA6enVypfcpAVI3Y";
export const supabase = createClient(supabaseUrl, supabaseKey);