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
    if ( !tags ) { return <></> }

    if ( tags.length > Options.MaxTagsAtDisplay ) {
        // slice() does NOT include the end element
        // pitfall + 1
        tags = tags.slice( 0, Options.MaxTagsAtDisplay )
    }

    const tags_string = tags
        .map( t => `#${t}` )
        /** \u00A0 whitespace */
        .join( "\u00A0" )

    return <span class="text-xs text-slate-500/70">
        { tags_string }
    </span>
}


const LinkToPost = (
    { post }: { post: Lume.Data }
) => {
    const date_elem = <>
        <span class="text-slate-500/80 text-xs">
            { ( new SwDate( post.date ) ).to_mm_dd() }
        </span>
    </>

    const post_ref = <>
        <a href={ post.url }>
            { post.title ?? "<<Missing Title>>" }
        </a>
    </>

    return <li>
        { date_elem }
        &nbsp;&nbsp;
        { post_ref }
        &nbsp;&nbsp;
        <Tags tags={ post.tags }/>
    </li>
}


/**
 * A component that display a list of posts
 * while showing the year
 */
const PostsPerYear = ( { year, posts }: {
    year: string,
    posts: Lume.Data[]
} ) => {

    const year_elem = <>
        <h1 class="text-xl">{ year }</h1>
    </>

    const link_to_posts_elem = posts
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

    const posts_list_elem = <>
        <ul class="flex flex-col gap-2">{ link_to_posts_elem }</ul>
    </>

    return <section class="flex flex-col gap-2">
        { year_elem }
        { posts_list_elem }
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

    return <div class="py-4 flex flex-col gap-[6ch]">
        { years_elems }
    </div>

}
