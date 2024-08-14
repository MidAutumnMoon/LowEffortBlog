/**
 * The layouts of posts.
 */


export const layout = "base.tsx"


const Heading = (
    { title }: { title: string }
) => {

    return <>
        <h1 class="text-4xl font-semibold leading-loose">
            { title }
        </h1>
    </>
}

export default ( data: Lume.Data ) => {

    return <article>

        <Heading title={ data.title ?? "<Missing Title>" }/>

        <main
            class="
                prose
                leading-6
                max-w-full
            "
        >
            { data.children }
        </main>

    </article>
}