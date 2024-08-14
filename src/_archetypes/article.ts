import { SwDate } from "@lib/date.ts"
import { Slug } from "@lib/slug.ts"
import { SwID } from "@lib/id.ts"

export default ( title: string ) => {

    if ( !title ) {
        throw "New article requires a title"
    }

    const slug_path = Slug( title )

    const date = SwDate.today()
    const { year, month } = date

    const id = ( new SwID() ).text()

    return {
        path: `/articles/${year}/${month}/${slug_path}/index.md`,
        content: {
            title, id,
            date: date.toString(),
            updated: date.toString(),
            content: `\n# ${title}`
        }
    }

}
