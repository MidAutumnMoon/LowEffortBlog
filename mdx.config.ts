import * as lume_mdx from "lume/plugins/mdx.ts"

export default {

    rehypeOptions: {
        allowDangerousHtml: true,
        // U+EF0E: https://mts.io/2015/04/21/unicode-symbol-render-text-emoji/
        footnoteBackContent: "\u21A9\uFE0E"
    }

} satisfies lume_mdx.Options