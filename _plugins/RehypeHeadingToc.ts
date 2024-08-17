/**
 * A rehype plugin to add links to headings, and generated
 * a table of content.
 */


import * as hast from "npm:@types/hast"

import { heading as Heading } from "npm:hast-util-heading"
import { headingRank as HeadingRank } from "npm:hast-util-heading-rank"
import { fromText as HastFromText } from "npm:hast-util-from-text"

import { visit as Visit, SKIP, visit } from "npm:unist-util-visit"
import { inspect } from "npm:unist-util-inspect"


const Options = {
    AnchorClassName: "header-anchor"
} as const


export default function() {
    return function( tree: hast.Root ) {
        Visit( tree, "element", visitor )
    }
}


function visitor( node: hast.Element )
    : undefined | typeof SKIP
{
    /** 1) Skip non heading elements */
    if ( !Heading( node ) ) { return SKIP }

    /**
     * 2) Skip headings without id,
     * use rehype-slug to add slugs
     */
    if ( !node.properties.id ) { return SKIP }

    add_heading_link( node )
}


function add_heading_link( heading: hast.Element ) {
    const link: hast.Element = {
        type: "element",
        tagName: "a",
        properties: {
            className: Options.AnchorClassName,
            href: `#${heading.properties.id}`,
            ariaHidden: "true",
            tabIndex: "-1",
        },
        children: [
            { type: "text", value: "#" } satisfies hast.Text
        ]
    }
    heading.children = [ ...heading.children, link ]
}

