import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Delivery Planner",
    description: "Оптимизация маршрутов доставки",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    );
}
