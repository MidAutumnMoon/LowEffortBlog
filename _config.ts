import Lume from "lume/mod.ts"

import Esbuild from "lume/plugins/esbuild.ts"
import JsxPreact from "lume/plugins/jsx_preact.ts"

import Postcss from "lume/plugins/postcss.ts"
import PostcssNesting from "npm:postcss-nesting"

import Unocss from "lume/plugins/unocss.ts"
import UnoPresetUno from "@unocss/preset-uno"
import UnoPresetIcons from "@unocss/preset-icons"
import UnoPresetTypography from "@unocss/preset-typography"

import SlugifyUrls from "lume/plugins/slugify_urls.ts"
import Toml from "lume/plugins/toml.ts"
import Feed from "lume/plugins/feed.ts"


const site = Lume( {
    src: "src",
    location: new URL( "https://br.418.im/" )
} )


/**
 * Plugins
 */

site.use( Esbuild() )
site.use( JsxPreact() )

site.use( Postcss( {
    plugins:[ PostcssNesting ]
} ) )

site.use( Unocss( {
    options: {
        presets: [
            UnoPresetUno,
            // UnoPresetIcons(),
            UnoPresetTypography
        ],
    },
    reset: "eric-meyer",
    cssFile: "uno.css",
} ) )

site.use( SlugifyUrls() )
site.use( Toml() )

// site.use( Feed() )


/**
 * Data
 */

site.data( "default_title", "Brrr" )


/**
 * Static assets
 */

site.copy( "public" )


export default site
