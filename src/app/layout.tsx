import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import SessionProvider from "./providers/sessionProvider";
import { getServerSession } from 'next-auth'


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MEAL Comida prática",
  description: "Comida prática e saudável para o seu dia a dia",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
