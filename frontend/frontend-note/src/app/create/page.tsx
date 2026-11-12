"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!res.ok) throw new Error("failed to create note");

      await res.json();

      setTitle("");
      setContent("");

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}