import { useDrawerState, useDrawerStateMutators } from "../../atom/sideBarDrawerState"
import SideNavBar from "./SideNavBar"

const SideNavBarDrawer = () => {
    const isOpen = useDrawerState()

    const { setDrawerState } = useDrawerStateMutators()

    if (isOpen) {
        return (
            <div className={`z-50 flex h-full w-full bg-gray-500 bg-opacity-50`}>
                <div className="h-screen bg-white">
                    <div className="h-[100svh]">
                        <SideNavBar />
                    </div>
                </div>
                <div
                    className=" max-h-screen w-40 max-w-full"
                    onClick={() => {
                        setDrawerState(false)
                    }}
                ></div>
            </div>
        )
    } else {
        return <></>
    }
}

export default SideNavBarDrawer
