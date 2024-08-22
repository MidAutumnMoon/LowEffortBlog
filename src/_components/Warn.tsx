/**
 * A Github styled warning blockquote
 */

import { ComponentChildren } from "preact"


type Props = {
    children: ComponentChildren,
}

export default function(
    { children }: Props
) {
    return <blockquote
        class="
            not-prose
            border-yellow-400 border-l-8 border
            ps-3 pe-3 py-3
        "
    >

        {/* yellow-400 will make the text harder to read */}
        <p class="text-yellow-600 mb-3 flex gap-2">
            <span class="icon-[mdi--warning-outline] w-6 h-6"></span>
            <span class="">Warning</span>
        </p>

        <p>{ children }</p>

    </blockquote>
}