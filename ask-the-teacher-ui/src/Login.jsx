import "./Login.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lerenrdkevxavfrctiiz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcmVucmRrZXZ4YXZmcmN0aWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY5OTAsImV4cCI6MjA3Njg5Mjk5MH0.EswqHmwUfAeidxx2YFPy32uLIx9cA6enVypfcpAVI3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
    const handleAzureLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'azure',
            options: {
                scopes: 'email openid profile',
                redirectTo: 'http://localhost:5173/',
            },
        });

        if (error) {
            console.error("Error during login:", error.message);
        }
    }

    return (
        <div>
            <h1>Ask the Teacher</h1>
            <p>Login</p>
            <button onClick={handleAzureLogin}>Login with Microsoft</button>
        </div>
    );
}