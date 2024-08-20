/**
 * A Github styled note blockquote
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
            border-blue-500 border-l-8 border
            ps-3 pe-3 py-3
        "
    >

        <p class="text-blue-500 mb-3 flex gap-2">
            <span class="icon-[mdi--information-outline] w-6 h-6"></span>
            <span class="">Note</span>
        </p>

        <p>{ children }</p>

    </blockquote>
}