const AddDate = props => {
	const diffrence = Date.now() / 1000 - props.date;
	const diffrenceInMinutes = Math.floor(diffrence / 60);

	let number = 0;
	let suffix = "";
	let text = "";

	if (diffrenceInMinutes < 60) {
		number = diffrenceInMinutes;

		if (diffrenceInMinutes === 1) suffix = "minutę";
		else if (diffrenceInMinutes >= 2 && diffrenceInMinutes <= 4)
			suffix = "minuty";
		else suffix = "minut";
	} else if (diffrenceInMinutes >= 60 && diffrenceInMinutes <= 1440) {
		const hours = Math.floor(diffrenceInMinutes / 60);
		number = hours;

		if (hours === 1) suffix = "godzine";
		else if (hours >= 2 && hours <= 4) suffix = "godziny";
		else suffix = "godzin";
	} else if (diffrenceInMinutes > 1440 && diffrenceInMinutes <= 10800) {
		const days = Math.floor(diffrenceInMinutes / (60 * 24));
		number = days;

		if (days === 1) suffix = "dzień";
		else suffix = "dni";
	} else {
		const weeks = Math.floor(diffrenceInMinutes / (60 * 24 * 7));
		number = weeks;

		if (weeks === 1) suffix = "tydzień";
		else if (weeks >= 2 && weeks <= 4) suffix = "tygodnie";
		else suffix = "tygodni";
	}

	text = `${number} ${suffix}`;

	return <span className="text-xs text-gray-600">Dodano {text} temu </span>;
};

export default AddDate;
