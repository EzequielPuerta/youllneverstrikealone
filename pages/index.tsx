import Head from "next/head";
import App from "./App";
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Mapa de Asambleas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
        <Analytics />
      </main>

      <footer>
          #NoAlDNU - #NoALaLeyOmnibus
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        :root {
          --foreground-rgb: 0, 0, 0;
          --background-start-rgb: 214, 219, 220;
          --background-end-rgb: 255, 255, 255;
        }
          
        @media (prefers-color-scheme: dark) {
          :root {
            --foreground-rgb: 255, 255, 255;
            --background-start-rgb: 0, 0, 0;
            --background-end-rgb: 0, 0, 0;
          }
        }
          
        body {
          color: rgb(var(--foreground-rgb));
          background: linear-gradient(
              to bottom,
              transparent,
              rgb(var(--background-end-rgb))
            )
            rgb(var(--background-start-rgb));
        }
          
        @layer utilities {
          .text-balance {
            text-wrap: balance;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
