import { BrDate } from "@lib/date.ts"

// Otherwise this very page also
// has the type of "article"
export const type = undefined
export const layout = "base.tsx"


const MaxTagsAtDisplay = 3

const Tags = ( prop: { tags: string[] } ) => {
    let { tags } = prop

    if ( !tags ) {
        return <></>
    }

    if ( tags.length > MaxTagsAtDisplay ) {
        tags = tags.slice( 0, MaxTagsAtDisplay + 0 )
    }

    return <ul class="
        text-xs
        flex flex-row flex-nowrap
        gap-1.5
        text-slate-500/70
    ">
        { tags.map( t => <li>#{t}</li> ) }
    </ul>
}


const MissingTitle = <>
    <span class="italic text-slate/80">&lt;Missing Title&gt;</span>
</>

const Article = (
    { article }: { article: Lume.Data }
) => {
    const brdate = new BrDate( article.date )

    const date_elem = <div class="
        text-xs
        text-slate-500/80
    ">
        { brdate.to_mm_dd() }
    </div>

    return <li class="
        flex flex-row flex-nowrap
        gap-2
    ">
        { date_elem }
        <a href={article.url}>
            { article.title ?? MissingTitle }
        </a>
        <Tags tags={ article.tags }/>
    </li>
}


const ArticlesByYear = ( prop: {
    year: string,
    articles: Lume.Data[]
} ) => {
    const { year, articles } = prop

    const articles_elems = articles
        // sort the articles from older (smaller timestamp)
        // to newer (bigger timestamp)
        .sort( ( a, b ) =>
            a.date.getTime() - b.date.getTime()
        )
        // reverse it so that the newer articles
        // are displayed first
        .reverse()
        .map( a => <Article article={a}/> )

    return <section class="
        flex flex-col flex-nowrap
        gap-2
    ">
        <h2 class="text-xl">{year}</h2>
        <ul class="
            pl-2ch
            flex flex-col flex-nowrap
            gap-4
        ">
            {articles_elems}
        </ul>
    </section>
}


export default ( data: Lume.Data ) => {

    const articles_by_year = (() => {
        const articles = data.search.pages( "type=article" )
        return Object.groupBy( articles,
            a => a.date.getFullYear()
        )
    })()

    const years_elems = Object.entries( articles_by_year )
        .filter( ([ _year, articles ]) => !!articles )
        .sort()
        // Make it descending, which means more recent years
        // got displayed first
        .reverse()
        .map( ([ year, articles ]) =>
            <ArticlesByYear year={year} articles={articles! as Lume.Data[]} />
        )

    return <div class="
        py-4
        flex flex-col flex-nowrap
        gap-10
    ">
        {years_elems}
    </div>

}
