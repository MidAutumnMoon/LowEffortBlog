import CreateSlugifier from "lume/core/slugifier.ts"

export function Slug( input: string ): string {
    const slugifier = CreateSlugifier()
    return slugifier( input )
}