import { useDrawerState, useDrawerStateMutators } from "../../atom/sideBarDrawerState"
import { Icon } from "@iconify/react"

const SideNabBarToggle = () => {
    const isOpen = useDrawerState()
    const { setDrawerState } = useDrawerStateMutators()

    return (
        <button
            className="p-2 text-3xl"
            onClick={() => {
                setDrawerState(!isOpen)
            }}
        >
            <Icon icon="charm:menu-hamburger" />
            {/* {isOpen && <div className="absolute">Opened</div>} */}
        </button>
    )
}

export default SideNabBarToggle
