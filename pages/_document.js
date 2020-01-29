import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          {/* WebFont loader for Google fonts. */}
          <script src='https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'></script>

          {/* Styles for Icons. */}
          <link
            rel='stylesheet'
            href='https://unicons.iconscout.com/release/v2.0.1/css/unicons.css'
          />

          {/* Filepond (uploader) styles. */}
          <link rel='stylesheet' href='/styles/filepond.css' />
          <link rel='stylesheet' href='/styles/filepond-plugin-image-preview.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
