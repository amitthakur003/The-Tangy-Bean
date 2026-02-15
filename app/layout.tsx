import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google"; // Corrected font import
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
    title: "TTB",
    description: "Scientific Luxury.",
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} ${playfair.variable}`}>
                <CartDrawer />
                {children}
            </body>
        </html>
    );
}
