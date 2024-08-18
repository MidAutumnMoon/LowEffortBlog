const background_style = `
    background: repeating-linear-gradient(
        35deg,
        #fef100 0 10px,
        black 10px 20px
    );
`

export default function() {
    return <section
        style={background_style}
        class="not-prose p-4 rounded-lg"
    >

        <h1 class="sr-only">
            Under Construction Warning
        </h1>

        <p
            class="
                w-full h-full rounded-lg
                text-center text-lg font-bold p-6 bg-[#fef100]
            "
        >
            Content Incomplete or Under Rewriting
        </p>

    </section>
}