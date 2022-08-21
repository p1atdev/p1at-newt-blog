interface Props {
    url: string
    title: string
    description: string
    thumbnail: string // image link
}

const LinkCard = ({ url, title, description, thumbnail }: Props) => {
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}

export default LinkCard
