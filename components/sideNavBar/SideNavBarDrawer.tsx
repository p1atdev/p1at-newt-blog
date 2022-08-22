import { useDrawerState, useDrawerStateMutators } from "../../atom/sideBarDrawerState"
import SideNavBar from "./SideNavBar"

const SideNavBarDrawer = () => {
    const isOpen = useDrawerState()

    const { setDrawerState } = useDrawerStateMutators()

    const style = isOpen ? "" : "hidden"

    return (
        <div className={`z-50 ${style} flex h-full bg-gray-500 bg-opacity-50`}>
            <div className=" bg-white">
                <SideNavBar />
            </div>
            <div
                className="w-40"
                onClick={() => {
                    setDrawerState(false)
                }}
            ></div>
        </div>
    )
}

export default SideNavBarDrawer
