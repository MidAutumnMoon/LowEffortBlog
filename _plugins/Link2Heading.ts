import { Slug } from "@lib/slug.ts"


function one_heading( heading: Element ) {
    const text = heading.textContent

    if ( !text ) { return }

    const slug = Slug( text )

    heading.id = slug

    heading.innerHTML = `
        <a href="#${ slug }" class="article-heading">
            ${text}
        </a>
    `
}


function one_page( page: Lume.Page ) {
    if ( page.data.type !== "article" ) {
        return
    }

    const dom = page.document

    if ( !dom ) {
        throw `Failed to get DOM for ${page.sourcePath}`
    }

    dom
        .querySelectorAll( "article h1,h2,h3,h4,h5,h6" )
        .forEach( one_heading )
}


/**
 * A Lume plugin for adding links to headings
 */
export default () => ( site: Lume.Site ) => {

    site.process( [".html"], ( pages ) => {
        for ( const p of pages )
            one_page( p )
    } )

}