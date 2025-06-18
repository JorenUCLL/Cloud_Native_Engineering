class QuoteService {
    static quotes = [
        { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" },
        { text: "Success isn’t always about greatness. It’s about consistency. Consistent hard work leads to success. Greatness will come.", author: "Dwayne 'The Rock' Johnson" },
        { text: "All progress takes place outside the comfort zone.", author: "Michael John Bobak" },
        { text: "If something stands between you and your success, move it. Never be denied.", author: "Dwayne 'The Rock' Johnson" },
        { text: "The clock is ticking. Are you becoming the person you want to be?", author: "Greg Plitt" },
        { text: "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.", author: "Arnold Schwarzenegger" },
        { text: "Success is usually the culmination of controlling failure.", author: "Sylvester Stallone" },
        { text: "The only bad workout is the one that didn’t happen.", author: "Unknown" },
        { text: "If you think lifting is dangerous, try being weak. Being weak is dangerous.", author: "Bret Contreras" },
        { text: "You must expect great things of yourself before you can do them.", author: "Michael Jordan" },
        { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
        { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
        { text: "We are what we repeatedly do. Excellence then is not an act but a habit.", author: "Will Durant" },
        { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
        { text: "The difference between the impossible and the possible lies in a person’s determination.", author: "Tommy Lasorda" },
        { text: "If you want something you’ve never had, you must be willing to do something you’ve never done.", author: "Thomas Jefferson" },
        { text: "To enjoy the glow of good health, you must exercise.", author: "Gene Tunney" },
        { text: "Take care of your body. It’s the only place you have to live.", author: "Jim Rohn" },
        { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
        { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
        { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
        { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
        { text: "What hurts today makes you stronger tomorrow.", author: "Jay Cutler" },
        { text: "The difference between try and triumph is a little 'umph'.", author: "Marvin Phillips" },
        { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
        { text: "You have to think it before you can do it. The mind is what makes it all possible.", author: "Kai Greene" },
        { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
        { text: "If you fail to prepare, you’re prepared to fail.", author: "Mark Spitz" },
        { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
        { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
        { text: "Don’t wish for a good body, work for it.", author: "Unknown" },
        { text: "The pain you feel today will be the strength you need tomorrow.", author: "Unknown" },
        { text: "You don’t have to be extreme, just consistent.", author: "Unknown" },
        { text: "Your body can stand almost anything. It’s your mind that you have to convince.", author: "Andrew Murphy" },
        { text: "The only way to define your limits is by going beyond them.", author: "Arthur Clarke" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Marilyn Monroe" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { text: "If you’re tired of starting over, stop giving up.", author: "Shia LaBeouf" },
        { text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
        { text: "The real workout starts when you want to stop.", author: "Ronnie Coleman" },
        { text: "If you want to be the best, you have to do things other people aren’t willing to do.", author: "Michael Phelps" },
        { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
        { text: "There’s no secret formula. I lift heavy, work hard, and aim to be the best.", author: "Ronnie Coleman" },
        { text: "If you believe in yourself, anything is possible.", author: "Miley Cyrus" },
        { text: "You have to expect things of yourself before you can do them.", author: "Michael Jordan" },
        { text: "The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it.", author: "Arnold Schwarzenegger" },
        { text: "Set your goals high, and don’t stop till you get there.", author: "Bo Jackson" },
        { text: "It’s going to be a journey. It’s not a sprint to get in shape.", author: "Kerri Walsh Jennings" },
        { text: "You’re only one workout away from a good mood.", author: "Unknown" },
    ];

    private static lastQuotes: number[] = [];

    static async getRandomQuote() {
        let randomIndex: number;
        const maxHistory = 10;
        const availableIndexes = this.quotes
            .map((_, idx) => idx)
            .filter(idx => !this.lastQuotes.includes(idx));

        if (availableIndexes.length === 0) {
            // All quotes have been shown recently, reset history except last one
            this.lastQuotes = this.lastQuotes.slice(-1);
            randomIndex = this.quotes
                .map((_, idx) => idx)
                .filter(idx => !this.lastQuotes.includes(idx))[0];
        } else {
            randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        }

        this.lastQuotes.push(randomIndex);
        if (this.lastQuotes.length > maxHistory) {
            this.lastQuotes.shift();
        }

        return this.quotes[randomIndex];
    }
}

export default QuoteService;