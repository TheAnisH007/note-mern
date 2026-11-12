"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export default function EditNote({ id }: {id:string}) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    const [deleteNote, setDeleteNote] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (!id) return
        async function Render() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`)
                if (!res.ok) throw new Error('failed to fetch')
                const result = await res.json()
                setTitle(result.title)
                setContent(result.content)
            }
            catch (err) {
                console.error(err)
                setError(true)
            }
            finally {
                setLoading(false)
            }
        }
        Render()
    }, [id])
    async function Edit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (title.trim() === '' || content.trim() === '') return
        setSaveChanges(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            })
            if (!res.ok) throw new Error('failed to fetch the method')
            router.push('/')
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setSaveChanges(false)
        }
    }
    async function Delete() {
        setDeleteNote(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
                method: 'DELETE',
            })
            const result = await res.json()
            router.push('/')
        }
        catch (err) {
            console.error(err)
            setDeleteNote(false)
        }
    }
    if (loading) return <p>loading...</p>
    if (error) return <p>Error</p>
    return (
        <div>
            <form onSubmit={Edit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <button type="button" onClick={()=>router.push('/')}>back</button>
                    <div>
                        <button type="button" onClick={Delete} disabled={deleteNote}>{deleteNote ? "deleting" : "delete"}</button>
                        <button type="submit" disabled={saveChanges}>{saveChanges ? "saving" : "save note"}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
