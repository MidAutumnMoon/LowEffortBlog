import CreateSlugifier from "lume/core/slugifier.ts"


export default ( title: string ) => {

    if ( !title ) {
        throw "New article requires a title"
    }

    const slug = (() => {
        const slugifier = CreateSlugifier()
        return slugifier( title )
    })()

    const [ year, month, day ] = (() => {
        const date = new Date()
        // Rubbish JS
        const parts = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
        ] as const
        return parts
            .map( p => p.toString() )
            .map( p => p.padStart( 2, "0" ) )
    })()

    return {
        path: `/articles/${year}/${month}/${slug}/index.md`,
        content: {
            title,
            date: `${year}-${month}-${day}`,
            content: `\n# ${title}`
        }
    }

}
