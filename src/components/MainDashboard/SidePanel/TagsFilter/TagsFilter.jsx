import { useContext } from "react";
import Tag from "./Tag/Tag";
import { TagsContext } from "../../../../context/tags-context";

const TagsFilter = () => {
	const tagsCtx = useContext(TagsContext);

	const tagsList = tagsCtx.tags.map((tag, index) => (
		<Tag isChosen={tag.isChosen} key={tag.id} index={index}>
			{tag.name}
		</Tag>
	));

	return <div className="mx-3 flex flex-wrap justify-center">{tagsList}</div>;
};

export default TagsFilter;
