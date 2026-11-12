import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-2 bg-[#A27A86] shadow-sm">
            <div className="text-2xl font-bold ml-2">Note</div>
            <Link href="/create" className="text-sm mr-2 bg-neutral-200 p-1 rounded-md">Create note</Link>
        </div>
    )
}