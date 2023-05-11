const AddDate = props => {
	const diffrence = Date.now() / 1000 - props.date;
	const diffrenceInMinutes = Math.floor(diffrence / 60);

	let text = "";

	if (diffrenceInMinutes >= 60 && diffrenceInMinutes <= 1440) {
		const hours = Math.floor(diffrenceInMinutes / 60);

		let suffix;
		if (hours === 1) suffix = "godzine";
		else if (hours >= 2 && hours <= 4) suffix = "godziny";
		else suffix = "godzin";

		text = `${hours} ${suffix}`;
	} else if (diffrenceInMinutes > 1440 && diffrenceInMinutes <= 10800) {
		const days = Math.floor(diffrenceInMinutes / (60 * 24));

		text = `${days} ${days === 1 ? "dzień" : "dni"}`;
	} else {
		const weeks = Math.floor(diffrenceInMinutes / (60 * 24 * 7));

		let suffix;
		if (weeks === 1) suffix = "tydzień";
		else if (weeks >= 2 && weeks <= 4) suffix = "tygodnie";
		else suffix = "tygodni";

		text = `${weeks} ${suffix}`;
	}

	return <span className="text-xs text-gray-600">Dodano {text} temu </span>;
};

export default AddDate;
