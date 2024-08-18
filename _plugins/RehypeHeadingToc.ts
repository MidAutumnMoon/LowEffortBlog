/**
 * A rehype plugin to add links to headings, and generated
 * a table of content.
 */


import * as hast from "npm:@types/hast"

import { h } from 'npm:hastscript'
import { heading as IsHeading } from "npm:hast-util-heading"
import { headingRank as HeadingRank } from "npm:hast-util-heading-rank"
import { toText as HastToText } from "npm:hast-util-to-text"

import { visit as Visit, SKIP } from "npm:unist-util-visit"


const Options = {
    AnchorClassName: "header-anchor",
    AnchorSymbol: "#",
    TocClassName: "table-of-content",
} as const


export default function() {
    return function( tree: hast.Root ) {
        /**
         * N.B. generate_toc before add_heading_link,
         * otherwise the `Options.AnchorSymbol` will be in the title
         */
        generate_toc( tree )
        add_heading_link( tree )
    }
}


function is_valid_heading( node: hast.Element ): boolean {
    /**
     * 1) Skip non heading elements
     */
    if ( !IsHeading( node ) ) {
        return false
    }
    /**
     * 2) Skip headings without id,
     * use rehype-slug to add slug as id
     */
    if ( !node.properties.id ) {
        return false
    }
    return true
}

function text( value: string ): hast.Text {
    return { type: "text", value }
}


/**
 * Add an anchor after each heading linking to the heading itself
 */
function add_heading_link( tree: hast.Root ) {
    Visit( tree, "element", ( node ) => {
        if ( !is_valid_heading( node ) ) {
            return SKIP
        }
        const anchor_link: hast.Element = {
            type: "element",
            tagName: "a",
            properties: {
                href: `#${node.properties.id}`,
                className: Options.AnchorClassName,
                ariaHidden: "true",
                tabIndex: "-1",
            },
            children: [ text( Options.AnchorSymbol ) ]
        }
        node.children.push( anchor_link )
    } )
}


function generate_toc( tree: hast.Root ) {

    type Heading = {
        depth: number,
        text: string,
        id: string,
        children: Heading[],
    }

    const headings: Heading[] = ( () => {
        const flat_stack: Heading[] = []

        /**
         * 1) collect headings into a flat array
         */
        Visit( tree, "element", ( node ) => {
            if ( !is_valid_heading( node ) ) {
                return SKIP
            }

            /**
             * Checked for heading before so it is
             * a heading and will have a rank
             */
            const depth = HeadingRank( node )!
            const text = HastToText( node )
            const id = `${node.properties.id}`

            flat_stack.push( { depth, text, id, children: [] } )
        } )


        /**
         * 2) nest headings according to depth
         *
         * Ref: https://github.com/lumeland/markdown-plugins/blob/main/toc/mod.ts
         */

        const node = { depth: 0, text: "", id: "", children: [] }
        const stack: Heading[] = [ node ]

        for ( const head of flat_stack ) {
            if ( head.depth > stack[0].depth ) {
                stack[0].children.push( head )
                stack.unshift( head )
                continue
            }

            if ( head.depth === stack[0].depth ) {
                stack[1].children.push( head )
                stack[0] = head
                continue
            }

            while ( head.depth <= stack[0].depth ) {
                stack.shift()
            }

            stack[0].children.push( head )
            stack.unshift( head )
        }

        return node.children
    } )()

    const toc = ( () => {

        function all( headings: Heading[] ): hast.Element {
            return h( "ul", headings.map( one ) )
        }

        function one( head: Heading ): hast.Element {
            const link = h( "a",
                { href: `#${head.id}` },
                [ head.text ]
            )
            return h( "li",
                [ link, all( head.children ) ]
            )
        }

        const heading = h( "h2",
            { class: "sr-only" },
            "Table of Content"
        )

        return h( "section",
            {
                class: Options.TocClassName,
                style: headings.length === 0 ? "display: none" : ""
            },
            [ heading, all( headings ) ],
        )

    } )()

    tree.children.unshift( toc )

}
