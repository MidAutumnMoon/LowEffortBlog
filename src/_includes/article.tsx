export const layout = "base.tsx"

export default ( data: Lume.Data ) => {
    return <>
        <article class="prose">
            {data.children}
        </article>
    </>
}