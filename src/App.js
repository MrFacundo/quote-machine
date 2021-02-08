import "./App.scss";
import COLORS_ARRAY from "./colorsArray";
import { useState } from "react";
import { useEffect } from "react";

import QuoteBox from "./components/QuoteBox.js";

// random index function for quotes and colors

const randomArrVal = (arr) => {
	let randomNum = Math.floor(Math.random() * arr.length);
	console.log(arr[randomNum]);
	return arr[randomNum];
};

// fetch quotes

const quotesDbUrl =
	"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

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
	const [color, setColor] = useState("#d3493a");
	const [currentQuote, setCurrentQuote] = useState({ author: "", quote: "" });
	const quotes = useFetch(quotesDbUrl);

	const [hover, setHover] = useState(false);
	const handleHover = () => setHover(!hover);

	useEffect(() => {
		if (quotes) {
			handleNewQuote();
		}
	}, [quotes]);

	const handleNewQuote = () => {
		let quoteArr = quotes.quotes;
		setCurrentQuote(randomArrVal(quoteArr));
		setColor(randomArrVal(COLORS_ARRAY));
	};

	return (
		<div
			id="wrapper"
			className="d-flex align-items-center justify-content-center"
		>
			<QuoteBox
				currentQuote={currentQuote}
				color={color}
				handleNewQuote={handleNewQuote}
				handleHover={handleHover}
				hover={hover}
			/>
		</div>
	);
}

export default App;
