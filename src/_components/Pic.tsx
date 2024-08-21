/**
 * A component to enhance Markdown picture.
 */


export default function(
    props: {
        src: string,
        alt?: string,
        title?: string,
        caption?: string
    }
) {

    return <figure>
        <img src={ props.src } alt={ props.alt } title={ props.title }/>
        <figcaption>{ props.caption }</figcaption>
    </figure>

}