import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-slate-900 bg-slate-50 dark:text-slate-50 text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
