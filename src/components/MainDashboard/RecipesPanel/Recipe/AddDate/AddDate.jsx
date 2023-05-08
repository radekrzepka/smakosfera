const AddDate = props => {
	const diffrence = Date.now() / 1000 - props.date;
	const diffrenceInMinutes = Math.floor(diffrence / 60);
	return <p>Przepis dodano {diffrenceInMinutes} minut temu</p>;
};

export default AddDate;
