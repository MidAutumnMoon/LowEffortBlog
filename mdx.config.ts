import * as lume_mdx from "lume/plugins/mdx.ts"

import RemarkMath from "remark-math"

import RehypeSlug from "rehype-slug"
import RehypeHeadingToc from "./_plugins/RehypeHeadingToc.ts"
import RehypeMathjax from "rehype-mathjax"


const MathjaxOption
    : NonNullable< Parameters<typeof RehypeMathjax>[0] > =
{
    tex: {
        // Apparently this is not deeply merged
        packages: [ "base", "ams" ]
    }
}

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
        [ RehypeMathjax, MathjaxOption ],
    ]

} satisfies lume_mdx.Options