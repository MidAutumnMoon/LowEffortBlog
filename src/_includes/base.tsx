const Nav = () => <>
    <nav class="text-lg">
        <ul class="
            flex flex-row flex-nowrap
            justify-between
            gap-6
        ">
            <li class="grow"><a href="/">Brrrr</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/rss">Feed</a></li>
        </ul>
    </nav>
</>


const Header = () => <>
    <header class="
        w-full
        py-6
    ">
        <Nav/>
    </header>
</>


const Footer = () => {
    const this_year = ( new Date() ).getFullYear()

    return <footer class="
        w-full h-fit
        py-6
        flex
        flex-row
        flex-nowrap
        justify-center
    ">
        <span class="text-center text-xs">
            &copy; MidAutumnMoon 2023-{this_year}
            &nbsp;&middot;&nbsp;
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                CC BY-SA 4.0
            </a>
        </span>
    </footer>
}


const Main = ( data: Lume.Data ) => <>
    {/* "lang" effects typography, be careful with it */}
    <main lang={data.lang ?? "en"}
        class="py-2"
    >
        {data.children}
    </main>
</>


export default ( data: Lume.Data ) => {

    const stylesheet =
        `/styles.css?cb=${ (new Date()).getTime() }`

    return <html lang="en" class="overflow-x-hidden">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title> {data.title ?? data.default_title} </title>
            <link rel="preload" href={stylesheet} as="style" />
            <link rel="stylesheet" href={stylesheet} />
        </head>

        <body class="
            overflow-x-hidden relative
            mx-4
            lg:mx-auto
            lg:max-w-3xl
        ">
            <Header/>
            <Main {...data}/>
            <Footer/>
        </body>
    </html>

}