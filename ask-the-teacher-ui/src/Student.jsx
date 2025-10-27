import { useState } from 'react';

export default function Student({ user }) {
    const [title, setTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !questionText.trim()) {
            setMessage('Please fill in both fields');
            return;
        }

        setLoading(true);
        setMessage('');

        const requestBody = {
            studentId: user.id,
            title: title,
            text: questionText
        };

        console.log('Sending request:', requestBody);
        console.log('User object:', user);

        try {
            const response = await fetch('http://localhost:5211/api/Questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: user.id,
                    title: title,
                    text: questionText
                })
            });

            if (response.ok) {
                setMessage('✓ Your question has been submitted successfully!');
                // Clear the form
                setTitle('');
                setQuestionText('');
            } else {
                setMessage('Error submitting question. Please try again.');
            }
        } catch (error) {
            setMessage('Error submitting question. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Ask a Question</h1>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '8px',
                            fontSize: '16px'
                        }}
                        placeholder="Brief title for your question"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Question Text:
                    </label>
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '8px',
                            fontSize: '16px',
                            minHeight: '150px'
                        }}
                        placeholder="Describe your question in detail"
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

                <button 
                    type="submit"
                    disabled={loading}
                    style={{ 
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Question'}
                </button>
            </form>
        </div>
    );
}