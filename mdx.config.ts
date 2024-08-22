import * as lume_mdx from "lume/plugins/mdx.ts"

import RemarkMath from "remark-math"

import RehypeSlug from "rehype-slug"
import RehypeHeadingToc from "./_plugins/RehypeHeadingToc.ts"
import RehypeMathjax from "rehype-mathjax"


export default {

    remarkPlugins: [
        RemarkMath
    ],

    rehypeOptions: {
        allowDangerousHtml: true,
        // U+EF0E: https://mts.io/2015/04/21/unicode-symbol-render-text-emoji/
        footnoteBackContent: "\u21A9\uFE0E"
    },

    rehypePlugins: [
        RehypeSlug,
        RehypeHeadingToc,
        RehypeMathjax,
    ]

} satisfies lume_mdx.Options