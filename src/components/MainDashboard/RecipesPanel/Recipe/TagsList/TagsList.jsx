const TagsList = props => {
	const tagList = props.list.map(tag => <li key={tag.id}>{tag.name}</li>);

	return <ul>{tagList}</ul>;
};

export default TagsList;
