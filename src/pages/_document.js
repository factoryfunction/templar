import Document, { Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../../styletron'

class MyDocument extends Document {
  static getInitialProps(props) {
    const stylesheets = styletron.getStylesheets() || []

    const page = props.renderPage((App) => (props) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))

    return { ...page, stylesheets }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/styles/unicons.css' />
          <link rel='stylesheet' href='/styles/templar.css' />
          <link rel='stylesheet' href='/styles/loader-triangle.css' />
          <link rel='stylesheet' href='/styles/react-datasheet.css' />
          <link rel='stylesheet' href='/styles/react-power-select.css' />
          <script type='text/javascript' src='https://apis.google.com/js/api.js'></script>

          {this.props.stylesheets.map((sheet, i) => (
            <style
              className='_styletron_hydrate_'
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
