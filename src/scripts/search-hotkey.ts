/**
 * Press key to start search
 */

const Key = "/"

addEventListener( "load", ( _load_ev ) => {
    const PagefindInput: HTMLInputElement | null =
        document.querySelector( "#pagefind-search input" )

    PagefindInput && addEventListener( "keydown", (ev) => {
        if ( ev.key === Key ) {
            console.log( "focus on pagefind")
            ev.preventDefault()
            PagefindInput.focus()
        }
    } )
} )