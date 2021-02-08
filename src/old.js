import "./App.scss";
import { useState } from "react";
import { useEffect } from "react";

const quotesDbUrl =
	"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
	const [quote, setQuote] = useState([]);
	const [author, setAuthor] = useState("Author");
	const [quotesArray, setQuotesArray] = useState([]);

	const fetchQuotes = async (url) => {
		const response = await fetch(url);
		const parsedJSON = await response.json();
		setQuotesArray(parsedJSON.quotes);
	};

	useEffect(() => {
		fetchQuotes(quotesDbUrl);
	}, [quotesDbUrl]);

	// console.log(quotesArray);

	console.log(quotesArray.length);

	const getRandomQuote = () => {
		let randomIndex = Math.floor(quotesArray.length * Math.random());
		return quotesArray[randomIndex];
	};

	// getRandomQuote();

	const myquote = getRandomQuote();

	console.log(myquote);

	return (
		<div
			id="wrapper"
			className="d-flex align-items-center justify-content-center"
		>
			<div id="quote-box" className="col-6 p-5 rounded">
				<div className="mb-3">
					<p id="text">{myquote.quote}</p>
					<cite id="author" className="d-block text-right">
						{/* - {quote.author} */}
					</cite>
				</div>

				<div className="d-flex justify-content-between">
					<a
						id="tweet-quote"
						className="btn btn-primary"
						target="_blank"
						// href={tweetUrl}
					>
						<i className="fa fa-twitter"></i>Tweet
					</a>
					<button
						id="new-quote"
						className="btn btn-primary"
						onClick={getRandomQuote}
					>
						{" "}
						New Quote
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
