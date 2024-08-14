export const layout = "article.tsx"
export const type = "article"
export const index = true

export function url( page: Lume.Page ): string {
    const { id, type } = page.data

    if ( type === "article" && !id ) {
        throw `${page.sourcePath} doesn't have an ID`
    }

    return `/articles/${id}/`
}