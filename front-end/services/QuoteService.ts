class QuoteService {
    static async getRandomQuote() {
        const response = await fetch('http://localhost:3000/api/quotes');
        const data = await response.json();
        return {
            text: data.text,
            author: data.author,
        };
    }
}

export default QuoteService;