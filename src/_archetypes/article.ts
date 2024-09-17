import { SwDate } from "@lib/date.ts"
import { Slug } from "@lib/slug.ts"


export default ( title: string ) => {

    if ( !title ) {
        throw "New post requires a title"
    }

    const slug_path = Slug( title )

    const date = SwDate.today()
    const { year, month } = date

    return {
        path: `/posts/${year}/${month}/${slug_path}/index.mdx`,
        content: {
            title, content: "",
            date: date.toString(),
            updated: date.toString(),
        }
    }

}
