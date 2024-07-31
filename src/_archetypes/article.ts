import { BrDate } from "@lib/date.ts"
import { Slug } from "@lib/slug.ts"

export default ( title: string ) => {

    if ( !title ) {
        throw "New article requires a title"
    }

    const slug = Slug( title )

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
