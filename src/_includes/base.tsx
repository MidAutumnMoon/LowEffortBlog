/**
 * The base skeleton of all layouts
 */


function Header() {
    const List = <ul class="text-lg flex gap-6">
        <li class="grow">
            <a href="/">ᕙ(&nbsp;&nbsp;&nbsp;leb&nbsp;&nbsp;&nbsp;)ᕗ</a>
        </li>
        <li>
            <a href="/posts">posts</a>
        </li>
        <li>
            <a href="/feed.xml">feed</a>
        </li>
    </ul>

    return <header class="w-full py-6">
        <nav> { List } </nav>
    </header>
}


function Footer () {
    const BackToTop = <div class="text-center">
        <a href="#">↑ Back to Top ↑</a>
    </div>

    const Copyright = <span class="text-center">
        &copy; MidAutumnMoon 2023-{ ( new Date() ).getFullYear() }
        &nbsp;&middot;&nbsp;
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
    </span>

    return <footer
        class="
            w-full h-fit my-8
            flex flex-col justify-center gap-6
            text-sm
        "
    >
        { BackToTop }
        { Copyright }
    </footer>
}


function Main( data: Lume.Data ) {
    // "lang" effects typography, be careful with it
    return <main
        lang={ data.lang ?? "en" }
        id="website-body"
    >
        { data.children }
    </main>
}


export default ( data: Lume.Data ) => {

    const stylesheet =
        `/styles.css?cb=${ (new Date()).getTime() }`

    return <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{ data.title ?? data.default_title }</title>
            <link rel="preload" href={ stylesheet } as="style" />
            <link rel="stylesheet" href={ stylesheet } />
            <link
                rel="alternate"
                type="application/rss+xml"
                title="RSS Feed for LowEffortBlog"
                href="/feed.xml"
            />
        </head>
        <body>
            <Header/>
            <Main { ...data }/>
            <Footer/>
        </body>
    </html>

}