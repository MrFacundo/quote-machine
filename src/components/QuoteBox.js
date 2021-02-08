import React from "react";

const QuoteBox = ({
	currentQuote,
	color,
	handleNewQuote,
	handleHover,
	hover,
}) => {
	const tweetUrl = `https://twitter.com/intent/tweet?text=${currentQuote.quote}-${currentQuote.author}`;

	// styles

	const buttonBase = {
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
	};

	const buttonTweet = {
		...buttonBase,
		borderWidth: "0",
		cursor: "pointer",
	};

	let buttonStyle;

	hover
		? (buttonStyle = {
				...buttonHover,
				backgroundColor: color,
				borderColor: color,
		  })
		: (buttonStyle = buttonBase);

	return (
		<div id="quote-box" className="col-6 rounded">
			<div className="align-items-center">
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

			<div id="buttons" className="row justify-content-between">
				<a id="tweet-quote" style={buttonTweet} target="_blank" href={tweetUrl}>
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
	);
};

export default QuoteBox;
