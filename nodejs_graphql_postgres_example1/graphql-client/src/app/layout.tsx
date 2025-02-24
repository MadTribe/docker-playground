import ApolloClientProvider from "@/lib/ApolloProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
