import "./App.scss";
import COLORS_ARRAY from "./colorsArray";
import { useState } from "react";
import { useEffect } from "react";

// styles

const buttonBase = {
	alignSelf: "flex-end",
	color: "#727e96",
	backgroundColor: "#282c34",
	borderStyle: "solid",
	borderWidth: "2px",
	borderColor: "#727e96",
	borderRadius: "5px",
	padding: "1em",
	outline: "none",
	marginTop: "4em",
};

const buttonHover = {
	...buttonBase,
	color: "black",
	cursor: "pointer",
};

const buttonTweet = {
	...buttonBase,
	borderWidth: "0",
	cursor: "pointer",
};

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
	const [hover, setHover] = useState(false);
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
		setColor(randomArrVal(COLORS_ARRAY));
	};

	const tweetUrl = `https://twitter.com/intent/tweet?text=${currentQuote.quote}-${currentQuote.author}`;

	// style button on hover

	let buttonStyle;

	const handleHover = () => setHover(!hover);

	hover
		? (buttonStyle = {
				...buttonHover,
				backgroundColor: color,
				borderColor: color,
		  })
		: (buttonStyle = buttonBase);

	return (
		<div
			id="wrapper"
			className="d-flex align-items-center justify-content-center"
		>
			<div id="quote-box" className="col-6 rounded">
				<div className="align-items-center mb-3">
					<div className="d-flex ">
						<i
							style={{ color: color, marginRight: "10px" }}
							className="fa fa-quote-left"
						></i>
						<p id="text" style={{ color: color }}>
							{"  " + currentQuote.quote}
						</p>
					</div>
					<cite
						id="author"
						style={{ color: "#727e96" }}
						className="d-block text-right"
					>
						- {currentQuote.author}
					</cite>
				</div>

				<div
					id="buttons"
					className="row align-items-end mt-auto justify-content-between"
				>
					<a
						id="tweet-quote"
						style={buttonTweet}
						target="_blank"
						href={tweetUrl}
					>
						<i style={{ fontSize: "60px" }} className="fa fa-twitter"></i>
					</a>
					<button
						id="new-quote"
						style={buttonStyle}
						onMouseEnter={() => handleHover()}
						onMouseLeave={() => handleHover()}
						onClick={() => handleNewQuote()}
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
