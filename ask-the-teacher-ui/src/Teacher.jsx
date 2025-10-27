import { useState, useEffect } from 'react';

export default function Teacher({ user }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5211/api/Questions');
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                setError('Failed to load questions');
            }
        } catch (err) {
            setError('Error loading questions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (questionId) => {
        if (!window.confirm('Are you sure you want to delete this question?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5211/api/Questions/${questionId}`, {
                method: 'DELETE'
            });

            if (response.ok || response.status === 204) {
                // Remove from list
                setQuestions(questions.filter(q => q.id !== questionId));
            } else {
                alert('Failed to delete question');
            }
        } catch (err) {
            alert('Error deleting question');
            console.error(err);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading questions...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Teacher Dashboard</h1>
            <h2>All Questions</h2>

            {questions.length === 0 ? (
                <p>No questions submitted yet.</p>
            ) : (
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0e13b2ff' }}>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>
                                Title
                            </th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
                            <tr key={question.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <a 
                                        href={`/question/${question.id}`}
                                        style={{ 
                                            color: '#007bff', 
                                            textDecoration: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {question.title}
                                    </a>
                                </td>
                                <td style={{ 
                                    padding: '10px', 
                                    border: '1px solid #ddd',
                                    textAlign: 'center'
                                }}>
                                    <button
                                        onClick={() => handleDelete(question.id)}
                                        style={{
                                            padding: '5px 15px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}