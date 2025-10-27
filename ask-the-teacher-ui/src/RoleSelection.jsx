import { useState } from 'react';
import { supabase } from './supabaseConfig';

export default function RoleSelection({ userId, onRoleSelected }) {
    const [selectedRole, setSelectedRole] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRoleSubmit = async () => {
        if (!selectedRole) {
            setError("Please select a role");
            return;
        }

        setLoading(true);
        setError(null);

        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                role: selectedRole
            });

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
        } else {
            onRoleSelected(selectedRole); // Notify parent component
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Welcome! Please select your role:</h2>
            
            <div style={{ margin: '20px 0' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input
                        type="radio"
                        value="student"
                        checked={selectedRole === 'student'}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    {' '}Student - I want to ask questions
                </label>
                
                <label style={{ display: 'block' }}>
                    <input
                        type="radio"
                        value="teacher"
                        checked={selectedRole === 'teacher'}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    {' '}Teacher - I want to view/edit/delete questions
                </label>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <button 
                onClick={handleRoleSubmit} 
                disabled={loading}
                style={{ padding: '10px 20px', fontSize: '16px' }}
            >
                {loading ? 'Saving...' : 'Continue'}
            </button>
        </div>
    );
}