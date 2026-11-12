"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Note {
    title: string;
    content: string;
    _id: string;
    createdAt: string;
    isFavorite: boolean;
}

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        async function Render() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`);
                if (!res.ok) throw new Error("failed to fetch");
                const result = await res.json();
                setNotes(result);
            } catch (err) {
                console.error(err);
            }
        }
        Render();
    }, []);

    async function DeleteNote(id: string) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
                method: "DELETE",
            }
            );
            setNotes((prev) => prev.filter((note) => note._id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    async function favorite(id: string) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}/favorite`,
                {
                    method: "PATCH",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update favorite");
            }

            const updatedNote = await res.json();

            setNotes((prev) =>
                prev.map((note) =>
                    note._id === id ? updatedNote : note
                )
            );
        } catch (err) {
            console.error(err);
        }
    }

    const sortedNotes = [...notes].sort((a, b) => {
        if (a.isFavorite === b.isFavorite) return 0;
        return a.isFavorite ? -1 : 1;
    });

    return (
        <div className="grid grid-cols-1 gap-3 m-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedNotes.map((note) => (
                <motion.div
                    key={note._id}
                    layout
                    transition={{
                        layout: {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        },
                    }}
                    className="rounded-xl bg-[#77686D] p-2 shadow-sm hover:shadow-md hover:shadow-[#77686D]/25">
                    <div className="flex justify-between">
                        <Link
                            href={`/note/${note._id}`}
                            className="flex flex-col gap-1 flex-1"
                        >
                            <span className="font-semibold text-xl">
                                {note.title.toUpperCase()}
                            </span>
                            <span className="text-gray-600 text-sm font-light">
                                {note.content}
                            </span>
                        </Link>

                        <motion.div
                            whileHover={{ scale: 1.10 }}
                        >
                            <Star
                                onClick={() => favorite(note._id)}
                                className={`h-6 w-4 cursor-pointer transition-all duration-200 ${note.isFavorite
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400"
                                    }`}
                            />
                        </motion.div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-3 items-center">
                            <Link
                                href={`/note/edit/${note._id}`}
                                className="bg-blue-500 text-white px-[12px] py-[4px] text-sm rounded-md cursor-pointer"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => DeleteNote(note._id)}
                                className="bg-red-600 text-white px-[12px] py-[4px] text-sm rounded-md cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}