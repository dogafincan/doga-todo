import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-screen-dynamic" lang="en">
      <Head />
      <body className="h-screen-dynamic bg-slate-50 text-base text-slate-900 dark:bg-black dark:text-slate-50 sm:text-xl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
