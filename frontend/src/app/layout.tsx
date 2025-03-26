
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet"/>
      </head>
      <body
       
      >
        <UserProvider>
          <div  className={`flex flex-col justify-between h-screen`}>

          <Header />
          <ToastContainer position="top-center" autoClose={3000} />
          {children}
          <Footer/>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
