/**
 * A Lume plugin to deal with external links.
 */


/**
 * Naive unfortunately
 */
function is_internal( input: string ): boolean {
    return input.startsWith( "./" )
        || input.startsWith( "#" )
        || ( input.startsWith( "/" ) && !input.startsWith( "//" ) )
}


function single_page( page: Lume.Page ) {
    if ( ! page.document ) {
        throw `Can't get document of ${page.sourcePath}`
    }

    Array.from(
        page.document.querySelectorAll( "a" )
    )
        .filter( a => !is_internal( a.getAttribute("href") ?? "" ) )
        .forEach( a => {
            a.classList.add( "external" )
            a.setAttribute( "target", "_blank" )
            a.setAttribute( "rel", "noopener noreferrer" )
        } )
}


export default () => ( site: Lume.Site ) => {
    site.process( [".html"], ( pages ) => {
        for ( const p of pages )
            single_page( p )
    } )
}