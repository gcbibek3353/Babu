import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provieder from "./Provieder";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import { getAllProducts } from "@/actions/product";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Babu(Quick-commerce Plattform) ",
  description: "Babu is a quick commerce platform that is build to deliver your needs within 10 minutes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getAllProducts();
  if(!res.success || !res.products?.length) return <html lang="en">
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
  >
   No Products found
  </body>
</html>

  // dummy data for products
  // const products = [
  //   {
  //     name : "apple",
  //     category : "fruit",
  //     price : 200
  //   },
  //   {
  //     name : "potato",
  //     category : "vegetable",
  //     price : 400
  //   },
  // ]
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provieder>
          {/* <Navbar products={res.products} /> */}
          <Cart />
          {children}
        </Provieder>
      </body>
    </html>
  );
}