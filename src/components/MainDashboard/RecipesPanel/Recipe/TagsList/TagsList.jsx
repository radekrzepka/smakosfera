import { useEffect, useState } from "react";
import Tag from "./Tag/Tag";
import { getTagsNameArrayFromTagsIdArray } from "../../../../../services/databaseServices";

const TagsList = props => {
	const [list, setList] = useState([]);

	useEffect(() => {
		if (props.list.length !== 0 && props.list.id) {
			getTagsNameArrayFromTagsIdArray(props.list).then(data => setList(data));
		} else {
			setList(props.list);
		}
	}, []);

	const tagList = list.map(tag => <Tag key={tag.tagId}>{tag.tagName}</Tag>);

	return <ul className="mb-3 flex flex-wrap justify-center">{tagList}</ul>;
};

export default TagsList;
