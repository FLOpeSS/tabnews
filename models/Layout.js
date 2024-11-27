// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A simple blog using Next.js" />
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>&copy; 2024 My Blog</footer>
    </>
  );
};

export default Layout;
