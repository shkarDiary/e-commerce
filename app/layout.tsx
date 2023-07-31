import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import Providers from "./ReactQueryProvider";
import { ReduxProvider } from "./redux/ReduxProvider";
import AuthProvider from "./context/user";
import { CartProvider } from "./context/cart";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
});

export const metadata = {
  title: "shkar",
  description: "clothig delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className + " " + "text-text"}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
