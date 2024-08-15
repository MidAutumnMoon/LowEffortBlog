/**
 * The layouts of posts.
 */


export const layout = "base.tsx"

import { Node as TocNode } from "lume_markdown_plugins/toc/mod.ts"
import { SwDate } from "@lib/date.ts"


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


type MetaProps = {
    words: number,
    tags: string[],
    date: Date,
    updated: string
}

const Meta = (
    { words, tags, date, updated }: MetaProps
) => {
    const updated_text = ( () => {
        const sw_date = SwDate.from_date( date )
        const sw_updated = SwDate.from_string( updated )

        if ( !sw_updated ) { return <></> }

        return sw_date.equals( sw_updated )
            ? `published ${sw_date}`
            : `updated ${sw_updated}`
    } )()

    return <div class="text-gray-600/50 italic flex gap-3 mb-5">
        <span>{ words } words</span>
        <span>{ tags.map( t => `#${t}` ).join( "\u00A0" ) }</span>
        <span class="grow text-end">{ updated_text }</span>
    </div>
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

        <Meta
            words={ readingInfo.words }
            tags={ tags }
            date={ page.date }
            updated={ page.updated }
        />

        <Toc toc={toc}/>

        <main class="prose">
            { page.children }
        </main>

    </article>

}