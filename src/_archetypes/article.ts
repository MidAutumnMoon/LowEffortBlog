import { BrDate } from "@lib/date.ts"
import { Slug } from "@lib/slug.ts"
import { BrID } from "@lib/id.ts"

export default ( title: string ) => {

    if ( !title ) {
        throw "New article requires a title"
    }

    const slug_path = Slug( title )

    const brdate = BrDate.today()
    const { year, month } = brdate

    const id = ( new BrID() ).text()

    return {
        path: `/articles/${year}/${month}/${slug_path}/index.md`,
        content: {
            title, id,
            date: brdate.toString(),
            updated: brdate.toString(),
            content: `\n# ${title}`
        }
    }

}
