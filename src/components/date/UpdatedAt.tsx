import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

interface Props {
    date: string
}

const UpdatedAt = ({ date }: Props) => {
    const [formatedDate, setFormatedDate] = useState("")

    useEffect(() => {
        setFormatedDate(format(new Date(date), "yyyy/MM/dd", { locale: ja }))
    }, [date])

    return (
        <div className="flex items-center gap-x-1 text-gray-400">
            <Icon icon="carbon:update-now" />
            <p>{formatedDate}</p>
        </div>
    )
}

export default UpdatedAt
