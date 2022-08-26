import { useCallback } from "react"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"

type TOCState = string | null

export const TOCStateKey = "tocState"

const tocStateRecoilState = atom<TOCState>({
    key: TOCStateKey,
    default: null,
})

export const useTOCState = () => {
    return useRecoilValue(tocStateRecoilState)
}

export const useTOCStateMutators = () => {
    const setState = useSetRecoilState(tocStateRecoilState)

    const setTOCState = useCallback((tocState: TOCState) => setState(tocState), [setState])

    return { setTOCState }
}
