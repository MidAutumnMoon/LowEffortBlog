/**
 * The layouts of posts.
 */


export const layout = "base.tsx"

import { SwDate } from "@lib/date.ts"
import type { JSX } from "preact"


/**
 * The big bold title
 */
function ShowTitle( { title }: { title: string } ) {
    return <h1
        class="text-4xl font-bold text-balance mb-6"
        data-pagefind-meta="title"
    >
        { title }
    </h1>
}


function ShowMeta(
    props: {
        reading_info?: { words: number },
        tags: string[],
        date: Date,
        updated: string
    }
) {
    const { reading_info, tags, date, updated } = props

    const components: JSX.Element[] = []

    // renders to "x words"
    if ( reading_info ) {
        const { words } = reading_info
        components.push( <>{words} words</> )
    }

    // adds " of " between if both reading_info and tags
    // are presented
    if ( reading_info && tags?.length ) {
        components.push( <>&nbsp;of&nbsp;</> )
    }

    // renders to "#tag #tag"
    if ( tags?.length ) {
        const tag_list = tags
            .map( t => `#${t}` )
            .join( "\u00A0" )
        components.push( <>{tag_list}</> )
    }

    // adds a comma if both sections have content
    if ( components.length && date && updated ) {
        components.push( <>,&nbsp;</> )
    }

    // renders to "posted on y-m-d" or "updated on y-m-d"
    if ( date && updated ) {
        const sw_posted = SwDate.from_date( date )
        const sw_updated = SwDate.from_string( updated )

        const c = sw_posted.equals( sw_updated )
            ? <>posted on {sw_posted.toString()}</>
            : <>updated on {sw_updated.toString()}</>

        components.push(
            <span data-pagefind-ignore>{c}</span>
        )
    }

    return <div class="text-gray-400 italic mb-3" lang="en">
        { components }
    </div>
}


export default function( page: Lume.Data ) {

    const { title, readingInfo, tags } = page

    return <article>

        { page.incomplete
            ? <> <page.comp.Incomplete /> <br /> </>
            : <></>
        }

        <ShowMeta
            reading_info={ readingInfo }
            tags={ tags }
            date={ page.date }
            updated={ page.updated }
        />

        <ShowTitle title={ title ?? "<<Missing Title>>" }/>

        <main class="prose" id="article-content">
            { page.children }
        </main>

    </article>

}
