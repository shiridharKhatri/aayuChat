import { Inter } from "next/font/google";
import "./style/global.css";
import { StateProvider } from "./context/State";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aayuchat",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}