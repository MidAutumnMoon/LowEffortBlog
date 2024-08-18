import * as lume_mdx from "lume/plugins/mdx.ts"

import RehypeSlug from "rehype-slug"
import RehypeHeadingToc from "./_plugins/RehypeHeadingToc.ts"


export default {

    rehypeOptions: {
        allowDangerousHtml: true,
        // U+EF0E: https://mts.io/2015/04/21/unicode-symbol-render-text-emoji/
        footnoteBackContent: "\u21A9\uFE0E"
    },

    rehypePlugins: [
        RehypeSlug,
        RehypeHeadingToc,
    ]

} satisfies lume_mdx.Options