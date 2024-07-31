export const layout = "base.tsx"

const Heading = (
    { title }: { title: string }
) => {

    return <>
        <h1 class="text-3xl font-semibold">
            { title }
        </h1>
    </>
}

export default ( data: Lume.Data ) => {

    return <article>
        <Heading title={data.title ?? "<Missing Title>"}/>
        <div class="prose">
            {data.children}
        </div>
    </article>
}