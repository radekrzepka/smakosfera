import Tag from "./Tag/Tag";

const TagsList = props => {
	const tagList = props.list.map(tag => (
		<Tag key={tag.tagId}>{tag.tagName}</Tag>
	));

	return <ul className="flex">{tagList}</ul>;
};

export default TagsList;
