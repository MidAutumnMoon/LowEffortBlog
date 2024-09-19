/**
 * The base skeleton of all layouts
 */


function ShowSiteHeader( data: Lume.Data ) {

    function ShowSiteTitle() {
        return <a href="/"
            style="text-decoration:none"
            class="block my-4 flex gap-4 items-center"
        >
            <div id="site-icon" class="bg-slate-500 w-[60px] h-[60px] text-white p-1 text-sm">
                here be icon
            </div>
            <h1 class="text-3xl font-bold">
                { data.site_title ?? "<<!!No Title!!>>" }
            </h1>
        </a>
    }

    function ShowNav() {
        return <ul class="text-lg flex gap-6">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/posts">Posts</a>
            </li>
            <li>
                <a href="/feed.xml">Feed</a>
            </li>
        </ul>
    }

    return <header class="mb-8">
        <ShowSiteTitle/>
        <ShowNav/>
    </header>

}


function ShowSiteFooter() {
    const ShowBackToTop = <div class="text-center">
        <a href="#">↑ Back to Top ↑</a>
    </div>

    const ShowCopyright = <span class="text-center">
        &copy; MidAutumnMoon 2023-{ ( new Date() ).getFullYear() }
        &nbsp;&middot;&nbsp;
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
    </span>

    return <footer
        class="my-4 flex flex-col justify-center gap-4 text-sm"
    >
        { ShowBackToTop }
        { ShowCopyright }
    </footer>
}


function ShowMainContent( data: Lume.Data ) {
    // "lang" effects typography, be careful with it
    return <main lang={ data.lang ?? "en" }>
        { data.children }
    </main>
}


export default ( data: Lume.Data ) => {

    function LinkStylesheet() {
        // For idiot Safari,
        // otherwise it caches everything even in dev mode.
        const cache_bust = crypto.randomUUID()
        return <>
            <link rel="preload" href={ `/styles.css?cb=${cache_bust}` } as="style" />
            <link rel="stylesheet" href={ `/styles.css?cb=${cache_bust}` } />
        </>
    }

    function LinkFeed() {
        return <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for LowEffortBlog"
            href="/feed.xml"
        />
    }

    function LinkScript() {
        return <></>
    }

    function Title( data: Lume.Data ) {
        const site_title = data.site_title ?? "<<!!No Title!!>>"
        const title = data.title ? `${data.title} | ` : ""
        return <title>
            { title }{ site_title }
        </title>
    }

    return <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <Title { ...data } />
            <LinkStylesheet/>
            <LinkScript/>
            <LinkFeed/>
        </head>
        <body>
            <ShowSiteHeader { ...data } />
            <ShowMainContent { ...data } />
            <ShowSiteFooter/>
        </body>
    </html>

}