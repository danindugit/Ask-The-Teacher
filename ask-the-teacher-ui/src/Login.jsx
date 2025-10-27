import { supabase } from './supabaseConfig';
import { useState, useEffect } from 'react';
import RoleSelection from './RoleSelection';
import Student from './Student';

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

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173',
            },
        });

        if (error) {
            console.error("Error during login:", error.message);
        }
    };

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
                {userRole === 'student' && <Student user={user} />}
            
                {userRole === 'teacher' && (
                    <div>
                        <h1>Welcome Teacher!</h1>
                        <p>Teacher dashboard coming soon...</p>
                    </div>
                )}
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
            <br />
            <br />
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}