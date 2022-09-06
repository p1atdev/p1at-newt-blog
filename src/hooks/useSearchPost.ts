import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Post, Posts } from "../types/posts"

export const useSearchPost = () => {
    const [query, setQuery] = useState("")
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const q = router.query.q
            if (q && typeof q === "string") {
                setQuery(q)
            }
        }
    }, [router])

    useEffect(() => {
        if (query !== "") {
            setPage(1)
            setTotal(0)
            setPosts([])
        }
    }, [query])

    useEffect(() => {
        if (query !== "") {
            search()
        }
    }, [page])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch(`/api/search/post?q=${query}&page=${page}`)

        const json: Posts = await res.json()

        setPosts(json.items)
        setTotal(json.total)
    }

    const search = async () => {
        const res = await fetch(`/api/search/post?q=${query}&page=${page}`)

        const json: Posts = await res.json()

        setPosts(json.items)
        setTotal(json.total)
    }

    const prevPage = () => {
        if (page === 1) {
            return
        }

        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    return {
        query,
        posts,
        page,
        total,
        search,
        handleChange,
        handleSearch,
        prevPage,
        nextPage,
    }
}
