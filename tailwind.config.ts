import * as Iconify from "@iconify/tailwind"
import * as IconifyMdi from "@iconify-json/mdi"


const Icons = Iconify.addDynamicIconSelectors( {
    iconSets: {
        "mdi": IconifyMdi.icons
    }
} )

export default {

    plugins: [
        Icons,
    ],

    theme: {
        fontFamily: {
            sans: "sans-serif",
            serif: "serif",
            mono: "monospace"
        }
    },

    safelist: [
        /**
         * .external was added by ExternalLink plugin,
         * which made Tailwind unable to detect in normal ways
         */
        "external",
    ]
    
}