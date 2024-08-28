import Lume from "lume/mod.ts"

import MDX from "lume/plugins/mdx.ts"
import MdxOption from "./mdx.config.ts"

import Esbuild from "lume/plugins/esbuild.ts"
import EsbuildMinicss from "./_plugins/EsbuildMinicss.ts"
import JsxPreact from "lume/plugins/jsx_preact.ts"
import Minify from "lume/plugins/minify_html.ts"
import Highlight from "lume/plugins/code_highlight.ts"

import Postcss from "lume/plugins/postcss.ts"
import Tailwind from "lume/plugins/tailwindcss.ts"
import TailwindOption from "./tailwind.config.ts"
import Sass from "lume/plugins/sass.ts"

import Toml from "lume/plugins/toml.ts"
import Feed from "lume/plugins/feed.ts"
import Sitemap from "lume/plugins/sitemap.ts"
import ReadingInfo from "lume/plugins/reading_info.ts"

import ImageDimension from "./_plugins/ImageDimension.ts"
import { ImageExtensions } from "@lib/extension.ts"
import ExternalLink from "./_plugins/ExternalLink.ts"
import Meta from "lume/plugins/metas.ts"


const site = Lume( {
    src: "src",
    location: new URL( "https://leb.418.im/" ),
} )


/**
 * Plugins
 */

site.use( Toml() )
site.use( JsxPreact() )
site.use( MDX( MdxOption ) )

site.use( Highlight( {
    theme: {
        name: "base16/github",
        path: "/_includes/base16_github.css"
    }
} ) )

site.use( Tailwind( {
    options: TailwindOption
} ) )
site.use( Sass() )
site.use( Postcss() )

site.use( Esbuild() )
site.use( EsbuildMinicss() )
site.use( Minify() )

site.use( Sitemap() )
site.use( ImageDimension() )
site.use( ExternalLink() )

site.use( ReadingInfo( {
    extensions: [ ".md", ".mdx" ]
} ) )

site.use( Feed( {
    output: "/feed.xml",
    query: "type=post",
    info: {
        title: "LowEffortBlog",
    },
    items: {
        updated: data => new Date( data.updated )
    }
} ) )

site.use( Meta())


/**
 * Data
 */

site.data( "default_title", "leb" )
site.data( "git_repo", "https://github.com/MidAutumnMoon/LowEffortBlog" )


/**
 * Static assets
 */

site.copy( "public", "." )

site.copy( ImageExtensions )
site.copy( [".svg"] )


export default site
