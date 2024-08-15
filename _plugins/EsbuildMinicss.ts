import * as esbuild from "esbuild"


/**
 * A Lume plugin to minify CSS files harder
 */
export default () => ( site: Lume.Site ) => {

    const minify = async ( content: string ) => {
        const options: esbuild.TransformOptions = {
            loader: "css",
            minify: true,
            minifyWhitespace: true,
        }
        return await esbuild.transform( content, options )
    }

    site.process( [".css"], async ( css_pages ) => {
        for ( const css of css_pages ) {
            css.content = ( await minify( css.content as string ) ).code
        }
    } )

}