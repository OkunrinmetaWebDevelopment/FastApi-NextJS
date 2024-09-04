import { useState } from 'react';

export default function ChatStream() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleStream = async (url: string) => {
        setResponse(''); // Clear previous response

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_question: question }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
            const { done, value } = await reader?.read()!;
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            setResponse(prev => prev + chunk);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleStream('/api/chat_with_pdf');
                }}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="question"
                    >
                        Ask a question
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="question"
                        type="text"
                        placeholder="Ask a question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h3 className="text-gray-700 font-bold mb-2">Response:</h3>
                <p className="text-gray-700">{response}</p>
            </div>
        </div>
    );
}