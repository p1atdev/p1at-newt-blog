import Tag from "./Tag"

interface TagItem {
    _id: string
    name: string
    color: string
}

interface Props {
    tags: TagItem[]
}

const TagList = ({ tags }: Props) => {
    return (
        <div className="flex flex-wrap gap-x-2 gap-y-3 pt-2 text-sm">
            {tags.map((tag) => {
                return <Tag key={tag._id} name={tag.name} color={tag.color} />
            })}
        </div>
    )
}

export default TagList
