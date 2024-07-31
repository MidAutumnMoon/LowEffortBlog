import Typography from "@tailwindcss/typography"

import * as Iconify from "@iconify/tailwind"
import * as IconifyMdi from "@iconify-json/mdi"


const Icons = Iconify.addDynamicIconSelectors( {
    iconSets: {
        "mdi": IconifyMdi.icons
    }
} )

export default {
    plugins: [
        Typography,
        Icons,
    ]
}