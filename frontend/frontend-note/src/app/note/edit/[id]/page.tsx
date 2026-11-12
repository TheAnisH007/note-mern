import EditNote from "@/app/components/EditPage";
interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return <EditNote id={id} />;
}