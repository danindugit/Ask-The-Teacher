import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuestionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [question, setQuestion] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const fetchQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:5211/api/Questions/${id}`);
            if (response.ok) {
                const data = await response.json();
                setQuestion(data);
                setTitle(data.title);
                setText(data.text);
            } else {
                setError('Question not found');
            }
        } catch (err) {
            setError('Error loading question');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch(`http://localhost:5211/api/Questions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: question.studentId,
                    title: title,
                    text: text
                })
            });

            if (response.ok) {
                setMessage('✓ Question updated successfully!');
            } else {
                setMessage('Error updating question');
            }
        } catch (err) {
            setMessage('Error updating question');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this question?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5211/api/Questions/${id}`, {
                method: 'DELETE'
            });

            if (response.ok || response.status === 204) {
                navigate('/'); // Go back to teacher dashboard
            } else {
                alert('Failed to delete question');
            }
        } catch (err) {
            alert('Error deleting question');
            console.error(err);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate('/')}
                style={{ 
                    marginBottom: '20px',
                    padding: '8px 15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                ← Back to Questions
            </button>

            <h1>Edit Question</h1>

            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Question Text:
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            fontSize: '16px',
                            minHeight: '200px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                {message && (
                    <div style={{ 
                        padding: '10px', 
                        marginBottom: '15px',
                        backgroundColor: message.includes('✓') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✓') ? '#155724' : '#721c24',
                        borderRadius: '4px'
                    }}>
                        {message}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="submit"
                        disabled={saving}
                        style={{ 
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: saving ? '#ccc' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: saving ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button 
                        type="button"
                        onClick={handleDelete}
                        style={{ 
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete Question
                    </button>
                </div>
            </form>
        </div>
    );
}