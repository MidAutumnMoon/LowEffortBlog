import Lume from "lume/mod.ts"

import Esbuild from "lume/plugins/esbuild.ts"
import EsbuildMinicss from "./_plugins/EsbuildMinicss.ts"
import JsxPreact from "lume/plugins/jsx_preact.ts"
import Minify from "lume/plugins/minify_html.ts"
import Highlight from "lume/plugins/code_highlight.ts"

import Postcss from "lume/plugins/postcss.ts"
import Tailwind from "lume/plugins/tailwindcss.ts"
import TailwindOption from "./tailwind.config.ts"

import Toml from "lume/plugins/toml.ts"
import Feed from "lume/plugins/feed.ts"
import Sitemap from "lume/plugins/sitemap.ts"
import ResolveUrls from "lume/plugins/resolve_urls.ts"

import Link2Heading from "./_plugins/Link2Heading.ts"


const site = Lume( {
    src: "src",
    location: new URL( "https://sw.418.im/" )
} )


/**
 * Plugins
 */


site.use( Toml() )
site.use( JsxPreact() )
site.use( ResolveUrls() )
// site.use( Link2Heading() )

site.use( Highlight( {
    theme: {
        name: "base16/github",
        path: "/_includes/base16_github.css"
    }
} ) )

site.use( Tailwind( {
    options: TailwindOption
} ) )
site.use( Postcss() )

site.use( Esbuild() )
site.use( EsbuildMinicss() )
site.use( Minify() )

site.use( Sitemap() )
// site.use( Feed() )


/**
 * Data
 */

site.data( "default_title", "Swoosh" )


/**
 * Static assets
 */

site.copy( "public", "." )

site.copy( [
    ".jpg",
    ".png",
    ".avif",
    ".svg"
] );


export default site
