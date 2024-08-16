/**
 * The layouts of posts.
 */


export const layout = "base.tsx"

import { Node as TocNode } from "lume_markdown_plugins/toc/mod.ts"
import { SwDate } from "@lib/date.ts"


/**
 * The big bold title
 */
function Title( { title }: { title: string } ) {
    return <>
        <h1 class="text-4xl font-bold leading-tight my-4">
            { title }
        </h1>
    </>
}


function Meta(
    props: {
        words: number,
        tags: string[],
        date: Date,
        updated: string
    }
) {
    return <div class="text-gray-600/50 italic flex gap-3 mb-5">

        {/*
            renders to "1000 words of #rant"
        */}
        <span>
            { props.words } words of { props.tags.map( t => `#${t}` ).join( "\u00A0" ) }
        </span>

        {/*
            renders to "posted y-m-d" or "updated y-m-d" accordingly
         */}
        <span class="grow text-end">
            { ( () => {
                const posted = SwDate.from_date( props.date )
                const updated = SwDate.from_string( props.updated )

                if ( !posted || !updated ) {
                    return <></>
                }

                return posted.equals( updated )
                    ? `posted ${posted}`
                    : `updated ${updated}`
            } )() }
        </span>

    </div>
}


function Toc( { toc }: { toc: TocNode[] } ) {
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


export default function( page: Lume.Data ) {

    const { title, readingInfo, tags } = page
    const toc = ( page.toc ?? [] ) as TocNode[]

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
