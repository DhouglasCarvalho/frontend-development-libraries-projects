const quotes = [
  {
    text: "The best way out is always through.",
    author: "Robert Frost"
  },
  {
    text: "What we think, we become.",
    author: "Buddha"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Everything you can imagine is real.",
    author: "Pablo Picasso"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  },
  {
    text: "It always seems impossible until it is done.",
    author: "Nelson Mandela"
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs"
  }
];

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: this.getRandomQuote()
    };

    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  handleNewQuote() {
    let newQuote = this.getRandomQuote();

    while (newQuote.text === this.state.quote.text) {
      newQuote = this.getRandomQuote();
    }

    this.setState({
      quote: newQuote
    });
  }

  render() {
    const quoteText = this.state.quote.text;
    const quoteAuthor = this.state.quote.author;

    const tweetUrl =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent('"' + quoteText + '" - ' + quoteAuthor);

    return (
      <div className="app">
        <div id="quote-box">
          <div id="text">"{quoteText}"</div>

          <div id="author">- {quoteAuthor}</div>

          <div className="actions">
            <button id="new-quote" onClick={this.handleNewQuote}>
              New Quote
            </button>

            <a
              id="tweet-quote"
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteMachine />, document.getElementById("root"));
