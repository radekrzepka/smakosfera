import ReactLoading from "react-loading";

const LoadingScreen = ({ color = "#fff", fullScreen = true }) => {
	return (
		<div
			className={`grid place-items-center bg-emerald-900 ${
				fullScreen ? "h-screen w-screen" : "h-full w-full"
			}`}
		>
			<ReactLoading type="spinningBubbles" color={color} />
		</div>
	);
};

export default LoadingScreen;
