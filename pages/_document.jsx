import Document, { Head, Main, NextScript } from "next/document";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
          <style global jsx>
            {`
              html,
              body,
              #__next {
                height: 100%;
              }

              body {
                margin: 0;
                padding: 0;
                background: #333;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Helvetica, Arial, sans-serif, "Apple Color Emoji",
                  "Segoe UI Emoji", "Segoe UI Symbol";
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
