/**
 * The layouts of posts.
 */


export const layout = "base.tsx"


/**
 * The big bold title
 */
const Title = (
    { title }: { title: string }
) => {
    return <>
        <h1 class="text-4xl font-bold leading-tight mb-8">
            { title }
        </h1>
    </>
}

export default ( data: Lume.Data ) => {
    return <article>
        <Title title={ data.title ?? "<<Missing Title>>" }/>
        <main class="prose">
            { data.children }
        </main>
    </article>
}