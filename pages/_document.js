// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from "theme-ui";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Replace html lang attribute value with your language.
    const APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
      <Html>
        <Head>
          <script
            src="https://cdn.jsdelivr.net/npm/@toruslabs/torus-embed"
            crossOrigin="anonymous"
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places&v=weekly`}
            defer
          />
          <script src="/node_modules/quill-video-resize-module/video-resize.min.js" />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
