import "./Login.css";
import { supabase } from './supabaseConfig';
import { useState, useEffect } from 'react';
import RoleSelection from './RoleSelection';

export default function Login() {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check current session on mount
        checkUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
                checkUserRole(session.user.id);
            } else {
                setUser(null);
                setUserRole(null);
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setUser(session.user);
            await checkUserRole(session.user.id);
        }
        setLoading(false);
    };

    const checkUserRole = async (userId) => {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();

        if (data) {
            setUserRole(data.role);
        }
    };

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setUserRole(null);
    };

    const handleRoleSelected = (role) => {
        setUserRole(role);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // If user is logged in but has no role, show role selection
    if (user && !userRole) {
        return (
            <div>
                <RoleSelection userId={user.id} onRoleSelected={handleRoleSelected} />
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        );
    }

    // If user is logged in and has a role, show a success message (temporary)
    if (user && userRole) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in as a {userRole}</p>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Ask the Teacher</h1>
            <button onClick={handleAzureLogin}>Login with Microsoft</button>
        </div>
    );
}