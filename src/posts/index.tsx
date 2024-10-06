import { SwDate } from "@lib/date.ts"

export const layout = "base.tsx"
export const type = undefined
export const url = "./"


/**
 * Show a list of #tags
 */
const ShowTags = (
    { tags }: { tags?: string[] }
) => {
    if ( !tags ) { return <></> }

    return <span class="text-sm text-slate-400">
        { ( tags.map( t => `#${t}` ).join( "\u00A0" ) ) }
    </span>
}


/**
 * Show a post entry with its date and tags etc.
 */
const ShowPost = (
    { post }: { post: Lume.Data }
) => {
    const ShowDate = <>
        <span class="text-slate-400 text-sm tabular-nums">
            { ( new SwDate( post.date ) ).to_mm_dd() }
        </span>
    </>

    const ShowLinkToPost = <>
        <a href={ post.url } lang={ post.lang ?? "en" }>
            { post.title ?? "<<Missing Title>>" }
        </a>
    </>

    return <>
        { ShowDate }
        &nbsp;&nbsp;
        { ShowLinkToPost }
        &nbsp;&nbsp;
        <ShowTags tags={ post.tags }/>
    </>
}


/**
 * A component that display a list of posts
 * while showing the year
 */
const ShowPostsByYear = ( { year, posts }: {
    year: string,
    posts: Lume.Data[]
} ) => {

    const ShowPostEntries = posts
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
        .map( p => <li><ShowPost post={ p }/></li> )

    return <section class="flex flex-col gap-2">
        <h1 class="text-xl">
            { year }
        </h1>
        <ul class="flex flex-col gap-2">
            { ShowPostEntries }
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

    const ShowPostsByYears = Object.entries( posts_by_years )
        .sort()
        // Make it descending, which means more recent years
        // got displayed first
        .reverse()
        .map( ([ year, posts ]) =>
            <ShowPostsByYear year={ year } posts={ posts! as Lume.Data[] } />
        )

    return <div class="py-2 flex flex-col gap-8" data-pagefind-ignore>
        { ShowPostsByYears }
    </div>

}
