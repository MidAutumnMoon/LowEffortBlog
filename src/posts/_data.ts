export const layout = "post.tsx"
export const type = "post"
export const index = true

export function url( page: Lume.Page ): string {
    const { id, type } = page.data

    if ( type === "post" && !id ) {
        throw `${page.sourcePath} doesn't have an ID`
    }

    return `/posts/${id}/`
}