/**
 * A Lume plugin for adding height and width
 * properties to imgs in order to combat CLS.
 */


import * as path from "@std/path"
import * as fs from "@std/fs"

import { ImageExtensions } from "@lib/extension.ts"
import Sharp from "sharp"

import { log } from "lume/core/utils/log.ts"


async function single_page( page: Lume.Page, site: Lume.Site ) {
    if ( ! page.document ) {
        throw `Can't get document of ${page.sourcePath}`
    }

    const { sourcePath } = page

    const img_src = Array.from( page.document.querySelectorAll( "img" ) )
        /**
         * 1. Cache the attribute with the element
         */
        .map( img => [ img, img.getAttribute( "src" ) ] )
        /**
         * 2. Remove images that refer externally
         */
        .filter( ([ _img, src ]) => [ "/", "./" ].some( p => `${src}`.startsWith(p) ) )
        /**
         * 3. Remove images that have none or
         * unsupported source files
         */
        .filter( ([ _img, src ]) =>
            ImageExtensions.some( ext => `${src}`.endsWith(ext) )
        ) as [ HTMLImageElement, string ][]

    for ( const [ img, src ] of img_src ) {
        /**
         * Pitfall document
         *
         * The site.copy function seems to run after plugins,
         * which means at the time of executing this plugin
         * the dest folder is yet populated,
         * in another word, sharp can't read image from the dest.
         *
         * The workaround is to fix path manually.
         */
        const full_path = (() => {
            if ( src.startsWith( "/" ) ) {
                /** Local absolute path */
                return src
            } else if ( src.startsWith("./") ) {
                /** Local relative path */
                const dir = path.dirname( sourcePath )
                const image = path.join( dir, src )
                return site.src( image )
            } else {
                // TODO: this is code after drunk
                throw `Not expected code path for ${src} ${sourcePath}`
            }
        })()

        if ( !await fs.exists( full_path, { isFile: true } ) ) {
            log.error( `${full_path} doesn't not exists! Typo?` )
            continue
        }

        const { width, height } = await Sharp( full_path ).metadata()

        if ( !width || !height ) {
            continue
        }

        img.setAttribute( "height", `${height}` )
        img.setAttribute( "width", `${width}` )
        img.setAttribute( "loading", "lazy" )
        img.setAttribute( "decoding", "async" )
    }

}


export default () => ( site: Lume.Site ) => {
    site.process( [".html"], ( pages ) => {
        for ( const p of pages )
            single_page( p, site )
    } )
}