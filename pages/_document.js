import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
                    <link rel="manifest" href="/favicon_io/site.webmanifest" />
                    {/* <link rel="icon" href="goodtimes.svg" /> */}
                    
                </Head>
                <body className='min-h-screen'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument