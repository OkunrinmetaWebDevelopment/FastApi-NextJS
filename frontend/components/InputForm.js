export default function InputForm({ input, handleInputChange, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg"
          disabled={isLoading}
          aria-label="Type your message"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded-r-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
}
