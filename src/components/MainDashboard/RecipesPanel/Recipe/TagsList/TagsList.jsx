import Tag from "./Tag/Tag";

const TagsList = props => {
	const tagList = props.list.map(tag => (
		<Tag key={tag.tagId}>{tag.tagName}</Tag>
	));

	return <ul className="mb-3 flex flex-wrap justify-center">{tagList}</ul>;
};

export default TagsList;
