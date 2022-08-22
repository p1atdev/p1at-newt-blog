import { useCallback } from "react"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"

type DrawerState = boolean | null

export const DrawerStateKey = "drawerState"

const drawerStateRecoilState = atom<DrawerState>({
    key: DrawerStateKey,
    default: false,
})

export const useDrawerState = () => {
    return useRecoilValue(drawerStateRecoilState)
}

export const useDrawerStateMutators = () => {
    const setState = useSetRecoilState(drawerStateRecoilState)

    const setDrawerState = useCallback((drawerState: DrawerState) => setState(drawerState), [setState])

    return { setDrawerState }
}
