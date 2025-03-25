
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./context/AuthContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha384-oS3vJWb5lS2jR9Xh6D7D6j5j5su65ANkP2Xk2pJv9yy6cF94Rvh6+Vi3X8P1hj+A"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`h-screen flex flex-col gap-8  justify-between`}
      >
        <UserProvider>
          <Header />
          {children}
          <Footer/>
        </UserProvider>
      </body>
    </html>
  );
}
