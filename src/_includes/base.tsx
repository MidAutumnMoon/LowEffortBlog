/**
 * The base skeleton of all layouts
 */


const Navbar = () => <>
    <nav class="text-xl">
        <ul
            class="
                flex flex-row flex-nowrap
                justify-between
                gap-6
            "
        >
            <li class="grow"><a href="/">swoosh</a></li>
            <li><a href="/posts">posts</a></li>
            <li><a href="/feed.xml">feed</a></li>
        </ul>
    </nav>
</>


const Header = () => <>
    <header
        class="
            w-full
            py-6
        "
    >
        <Navbar/>
    </header>
</>


const Footer = () => {
    const this_year = ( new Date() ).getFullYear()

    return <footer
        class="
            w-full h-fit py-6
            flex flex-row justify-center
        "
    >
        <span class="text-center text-xs">
            &copy; MidAutumnMoon 2023-{ this_year }
            &nbsp;&middot;&nbsp;
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                CC BY-SA 4.0
            </a>
        </span>
    </footer>
}


const Main = ( data: Lume.Data ) => <>
    {/* "lang" effects typography, be careful with it */}
    <main
        lang={ data.lang ?? "en" }
        class="py-2"
    >
        { data.children }
    </main>
</>


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
            <link rel="alternate" type="application/rss+xml" title="RSS Feed for Swoosh" href="/feed.xml" />
        </head>
        <body>
            <Header/>
            <Main { ...data }/>
            <Footer/>
        </body>
    </html>

}