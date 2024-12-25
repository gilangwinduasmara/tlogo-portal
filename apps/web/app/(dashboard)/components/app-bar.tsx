'use client'
import Link from "next/link"

type AppBarProps = {
    title?: string,
    onBack?: () => void,
    href?: string
}
export const AppBar = (props: AppBarProps) => {
    const { title, href } = props
    return (
        <div className="flex space-x-3 bg-white shadow-md p-3">
            <div onClick={props.onBack} className="cursor-pointer">
                <Link href={href || "#"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </Link>
            </div>
            {
                title &&
                <div className="font-bold text-lg text-black/60">{title}</div>
            }
        </div>
    )
}