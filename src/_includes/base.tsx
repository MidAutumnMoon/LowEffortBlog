const Nav = () => <>
    <nav class="text-xl">
        <ul class="
            flex
            flex-row
            justify-between
            flex-nowrap
            *:py-4
        ">
            <li><a href="/">Home</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/rss">RSS</a></li>
        </ul>
    </nav>
</>


const Header = () => <>
    <header class="w-full h-fit">
        <Nav/>
    </header>
</>


const Footer = () => <>
    <footer class="w-full h-fit bg-yellow">
        footer wow
    </footer>
</>


const Hr = () => <hr />


const Main = ( data: Lume.Data ) => <>
    {/* "lang" effects typography, be careful with it */}
    <main lang={data.lang ?? "en"}>
        {data.children}
    </main>
</>


export default ( data: Lume.Data ) => {

    return <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title> {data.title ?? data.DefaultTitle} </title>
            <link rel="preload" href="/uno.css" />
            <link rel="stylesheet" href="/uno.css" />
        </head>

        <body class="
            mx-auto
            lg:max-w-4xl
        ">
            <Header/>
            <Hr />
            <Main {...data}/>
            <Hr />
            <Footer/>
        </body>
    </html>

}