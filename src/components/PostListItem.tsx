import { Post } from "../types/posts"
import TagList from "../components/TagList"
import CreatedAt from "../components/date/CreatedAt"
import UpdatedAt from "../components/date/UpdatedAt"

interface Props {
    post: Post
}

const PostListItem = ({ post }: Props) => {
    return (
        <div className="flex rounded-md border border-gray-100 p-2 hover:border-gray-200 hover:shadow-sm">
            <div className="mx-2 w-16 p-4">
                <div className="m-auto text-3xl">{post.emoji.value}</div>
            </div>
            <div className="w-full pr-4 pt-2">
                <p className="text-xl font-semibold">{post.title}</p>
                <TagList tags={post.tags} />
                <div className="flex w-full justify-end gap-x-2">
                    <div className="hidden sm:block">
                        <CreatedAt date={post._sys.createdAt} />
                    </div>
                    <UpdatedAt date={post._sys.raw.publishedAt} />
                </div>
            </div>
        </div>
    )
}

export default PostListItem
