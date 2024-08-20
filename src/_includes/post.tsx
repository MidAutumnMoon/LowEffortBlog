/**
 * The layouts of posts.
 */


export const layout = "base.tsx"

import { SwDate } from "@lib/date.ts"


/**
 * The big bold title
 */
function Title( { title }: { title: string } ) {
    return <>
        <h1 class="text-4xl font-bold my-4 text-balance">
            { title }
        </h1>
    </>
}


function Meta(
    props: {
        reading_info?: { words: number },
        tags: string[],
        date: Date,
        updated: string
    }
) {
    return <div class="text-gray-500 italic flex gap-3 mb-5" lang="en">

        {/*
            renders to "1000 words of #rant" or
            "1000 words" if no tags or nothing if not having both
        */}
        <span>
            { ( function() {
                const { reading_info } = props
                return !reading_info
                    ? <></>
                    : `${reading_info.words} words\u00A0`
            } )() }
            { ( function() {
                const { tags } = props
                const tag_list = tags.map( t => `#${t}` ).join( "\u00A0" )
                return tags.length === 0
                    ? <></>
                    : `of ${tag_list}`
            } )() }
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


export default function( page: Lume.Data ) {

    const { title, readingInfo, tags } = page

    return <article>
        <Title title={ title ?? "<<Missing Title>>" }/>

        <Meta
            reading_info={ readingInfo }
            tags={ tags }
            date={ page.date }
            updated={ page.updated }
        />

        { page.incomplete ?? false
            ? <page.comp.Incomplete />
            : <></>
        }

        <main class="prose">
            { page.children }
        </main>
    </article>

}
