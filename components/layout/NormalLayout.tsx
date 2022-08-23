import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import SideNavBar from "../sideNavBar/SideNavBar"
import SideNavBarDrawer from "../sideNavBar/SideNavBarDrawer"
import SideNabBarToggle from "../sideNavBar/SideNavBarToggle"
import { Static } from "../../utils/static"
import Footer from "../Footer"
import { Tag } from "../../types/tags"
import TagList from "../TagList"

interface Props {
    children: ReactNode | ReactNode[]
    tags: Tag[]
}

const NormalLayout = ({ children, tags }: Props) => {
    return (
        <div className="h-screen w-screen">
            <div className="flex h-full w-full flex-col divide-x md:flex-row">
                {/* サイドバー */}
                <div className="hidden shrink-0 basis-1/4 md:block lg:basis-1/5">
                    <SideNavBar />
                </div>

                {/* ドロワー */}
                <div className="h-full w-full justify-end md:hidden">
                    <div className="fixed z-10 max-h-full w-full">
                        <SideNavBarDrawer />
                    </div>
                    <div className="mx-4 mt-2 flex items-center justify-between">
                        <Link href={"/"}>
                            <a>
                                <div className="flex items-center gap-x-2 px-2 pt-4 text-3xl font-bold">
                                    <div className="m-auto h-10 w-10 rounded-full bg-blue-100 p-0.5 text-[0px] tracking-normal">
                                        <Image
                                            src={Static.ProfileURL}
                                            width={36}
                                            height={36}
                                            className="rounded-full"
                                            alt="Plat profile icon"
                                        />
                                    </div>
                                    <p>Plat Dev</p>
                                </div>
                            </a>
                        </Link>
                        <SideNabBarToggle />
                    </div>
                </div>

                {/* 右の領域 */}
                <div className="flex grow flex-col divide-y md:overflow-auto lg:flex-row lg:divide-x ">
                    <div className="grow  divide-y lg:overflow-auto">
                        <div className="py-10 px-6">{children}</div>

                        <div className="hidden lg:block">
                            <Footer />
                        </div>
                    </div>

                    {/* タグとか色々 */}
                    <div className="shrink-0 basis-1/3 py-10 px-6 ">
                        <p className=" text-2xl font-semibold">検索</p>
                        {/* TODO: 検索欄 */}
                        <p>Coming soon...</p>
                        <p className=" text-2xl font-semibold">タグ一覧</p>
                        <TagList tags={tags} />
                    </div>

                    <div className="block lg:hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NormalLayout
