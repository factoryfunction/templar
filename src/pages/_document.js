import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com/' crossorigin='anonymous'></link>
          <link rel='stylesheet' href='/styles/unicons.css' />
          <link rel='stylesheet' href='/styles/loader-triangle.css' />
          <link rel='stylesheet' href='/styles/react-datasheet.css' />
          <link rel='stylesheet' href='/styles/react-power-select.css' />
          <script type='text/javascript' src='https://apis.google.com/js/api.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
