import { SwDate } from "@lib/date.ts"

export const layout = "base.tsx"
export const type = undefined
export const url = "./"

/**
 * Tweaks for various components in one place
 */
const Options = {
    MaxTagsAtDisplay: 3,
} as const


/**
 * Show a list of #tags
 */
const Tags = (
    { tags }: { tags?: string[] }
) => {
    if ( !tags ) {
        return <></>
    }

    if ( tags.length > Options.MaxTagsAtDisplay ) {
        // slice() does NOT include the end element
        // pitfall + 1
        tags = tags.slice( 0, Options.MaxTagsAtDisplay )
    }

    return <ul
        class="
            text-xs
            flex flex-row flex-nowrap
            gap-1.5
            text-slate-500/70
        "
    >
        { tags.map( t => <li>#{t}</li> ) }
    </ul>
}


const MissingTitle = <>
    <span class="italic text-slate/70">
        &lt;Missing Title&gt;
    </span>
</>

const LinkToPost = (
    { post }: { post: Lume.Data }
) => {
    const date_elem = <div
        class="
            text-xs
            text-slate-500/80
        "
    >
        { ( new SwDate( post.date ) ).to_mm_dd() }
    </div>

    return <li
        class="
            flex flex-row flex-nowrap
            items-center
            gap-2
        "
    >
        { date_elem }
        <a href={ post.url }>
            { post.title ?? MissingTitle }
        </a>
        <Tags tags={ post.tags }/>
    </li>
}


const PostsPerYear = ( { year, posts }: {
    year: string,
    posts: Lume.Data[]
} ) => {
    const link_to_posts = posts
        /**
         * 1. Sort posts by creation date from older (smaller timestamp)
         * to newer (bigger timestamp)
         */
        .sort( ( a, b ) =>
            a.date.getTime() - b.date.getTime()
        )
        /**
         * 2. The reverse it so that the newer ones
         * are at the front of list
         */
        .reverse()
        .map( p => <LinkToPost post={p}/> )

    return <section
        class="
            flex flex-col flex-nowrap
            gap-2
        "
    >
        <h2 class="text-xl">{year}</h2>
        <ul
            class="
                pl-[2ch]
                flex flex-col flex-nowrap
                gap-4
            "
        >
            { link_to_posts }
        </ul>
    </section>
}


export default ( data: Lume.Data ) => {

    const posts_by_years = (() => {
        /**
         * 1. Grab all posts in one array
         * like [ <post>, <post>, ... ]
         */
        const posts = data.search.pages( "type=post" )

        /**
         * 2. Group posts by full year,
         * the result object may look like
         * { 2023: [<post>, ...], 2024: [...] }
         */
        const by_year = Object.groupBy( posts,
            po => po.date.getFullYear()
        )

        return by_year
    })()

    const years_elems = Object.entries( posts_by_years )
        /**
         * Remove years
         */
        .filter( ([ _year, posts ]) => !!posts )
        .sort()
        // Make it descending, which means more recent years
        // got displayed first
        .reverse()
        .map( ([ year, posts ]) =>
            <PostsPerYear year={ year } posts={ posts! as Lume.Data[] } />
        )

    return <div
        class="
            py-4
            flex flex-col flex-nowrap
            gap-10
        "
    >
        { years_elems }
    </div>

}
