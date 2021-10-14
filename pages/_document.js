import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

// global.Buffer = global.Buffer || require("buffer").Buffer;

// if (typeof btoa === "undefined") {
//   global.btoa = function (str) {
//     return Buffer.from(str).toString("base64");
//   };
// }

// if (typeof atob === "undefined") {
//   global.atob = function (b64Encoded) {
//     return Buffer.from(b64Encoded, "base64").toString();
//   };
// }

// if (typeof window === "undefined") {
//   global.window = {};
// }

export default class extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&family=Red+Hat+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
