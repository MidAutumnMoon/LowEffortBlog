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
        <h1 class="text-4xl font-bold leading-tight my-4">
            { title }
        </h1>
    </>
}


const Meta = (
    { words, tags }: { words: number, tags: string[] }
) => {
    return <span
        class="
            inline-block mb-8 w-full
            text-sm text-gray-600 italic
        "
    >
        { words } words
        &nbsp;&middot;&nbsp;
        { tags.map( t => `#${t}` ).join( "\u00A0" ) }
    </span>
}


export default ( page: Lume.Data ) => {
    const { title, readingInfo, tags } = page
    return <article>
        <Title title={ title ?? "<<Missing Title>>" }/>
        <Meta words={ readingInfo.words } tags={ tags } />
        <main class="prose">{ page.children }</main>
    </article>
}