import "./App.scss";
import { useState } from "react";
import { useEffect } from "react";

const quotesDbUrl =
	"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const randomArrVal = (arr) => {
	console.log(arr);
	let randomNum = Math.floor(Math.random() * arr.length);
	console.log(arr[randomNum]);
	return arr[randomNum];
};

const useFetch = (url) => {
	const [data, setData] = useState(null);

	async function fetchData() {
		const response = await fetch(url);
		const json = await response.json();
		setData(json);
	}

	useEffect(() => {
		fetchData();
	}, [url]);
	return data;
};

function App() {
	const quotes = useFetch(quotesDbUrl);
	const [currentQuote, setCurrentQuote] = useState({ author: "", quote: "" });

	useEffect(() => {
		if (quotes) {
			handleNewQuote();
		}
	}, [quotes]);

	const handleNewQuote = () => {
		let quoteArr = quotes.quotes;
		setCurrentQuote(randomArrVal(quoteArr));
	};

	return (
		<div
			id="wrapper"
			className="d-flex align-items-center justify-content-center"
		>
			<div id="quote-box" className="col-6 p-5 rounded">
				<div className="mb-3">
					<p id="text">{currentQuote.quote}</p>
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
						onClick={() => handleNewQuote}
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
