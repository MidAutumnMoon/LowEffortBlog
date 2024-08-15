/**
 * The layouts of posts.
 */


export const layout = "base.tsx"

import { Node as TocNode } from "lume_markdown_plugins/toc/mod.ts"


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
    return <span class="inline-block mb-6 text-gray-600/50 italic">
        { words } words&nbsp;&middot;&nbsp;
        { tags.map( t => `#${t}` ).join( "\u00A0" ) }
    </span>
}


const Toc = ( { toc }: { toc: TocNode[] } ) => {
    if ( !toc.length ) { return <></> }

    function Item( { node }: { node: TocNode } ) {
        const href = `#${node.slug}`
        return <li class="my-1">
            <a href={ href }>{ node.text }</a>
            { <List toc={ node.children }/> }
        </li>
    }

    function List( { toc }: { toc: TocNode[] } ) {
        return <ul class="list-inside list-disc ps-[2ch] text-nowrap">
            { toc.map( t => <Item node={t}/> ) }
        </ul>
    }

    return <nav class="bg-blue-200/20 py-4 mb-8 overflow-x-scroll">
        <List toc={toc}/>
    </nav>
}


export default ( page: Lume.Data ) => {

    const { title, readingInfo, tags } = page
    const toc = page.toc as TocNode[]

    return <article>
        <Title title={ title ?? "<<Missing Title>>" }/>
        <Meta words={ readingInfo.words } tags={ tags } />
        <Toc toc={toc}/>
        <main class="prose">{ page.children }</main>
    </article>

}