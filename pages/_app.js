import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from './/context/CartContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
        <CartProvider>
        <Header />
        <div className="min-h-screen py-4 px-2">
      <Component {...pageProps} />
      </div>
      <Footer />
      </CartProvider>
    </SessionProvider>
  )
}




