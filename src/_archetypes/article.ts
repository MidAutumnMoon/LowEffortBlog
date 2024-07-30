import CreateSlugifier from "lume/core/slugifier.ts"

import { BrDate } from "@lib/date.ts"


export default ( title: string ) => {

    if ( !title ) {
        throw "New article requires a title"
    }

    const slug = (() => {
        const slugifier = CreateSlugifier()
        return slugifier( title )
    })()

    const brdate = BrDate.today()
    const { year, month } = brdate

    return {
        path: `/articles/${year}/${month}/${slug}/index.md`,
        content: {
            title,
            date: brdate.toString(),
            updated: brdate.toString(),
            content: `\n# ${title}`
        }
    }

}
