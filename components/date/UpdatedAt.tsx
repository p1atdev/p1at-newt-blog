import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Icon } from "@iconify/react"

interface Props {
    date: string
}

const UpdatedAt = ({ date }: Props) => {
    return (
        <div className="flex items-center gap-x-1 text-gray-400">
            <Icon icon="carbon:update-now" />
            <p>{format(new Date(date), "yyyy/MM/dd", { locale: ja })}</p>
        </div>
    )
}

export default UpdatedAt
