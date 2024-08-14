import Anchor from "markdown-it-anchor"


const anchor = [
    Anchor,
    {
        level: [ 1, 2, 3, 4 ],
        permalink: Anchor.permalink.linkInsideHeader()
    }
]

export default {
    plugins: [
        anchor
    ]
}