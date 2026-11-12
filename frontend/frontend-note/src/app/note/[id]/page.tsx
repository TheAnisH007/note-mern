interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`);
    const note = await res.json();

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
    );
}