const Button = props => {
	return (
		<div
			className="mx-3 my-5 flex cursor-pointer rounded border-b border-emerald-900 p-2 transition-all duration-300 hover:bg-emerald-100"
			onClick={() => props.setSelectedSite(props.site)}
		>
			<img alt="ikonka" src={props.icon} className="mx-3 h-5 w-5"></img>
			<span>{props.text}</span>
		</div>
	);
};

export default Button;
