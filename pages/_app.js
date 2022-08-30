import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import NftProvider from "../nftContext/context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NftProvider>
        <Navbar />
        <Component {...pageProps} />
      </NftProvider>
    </>
  );
}

export default MyApp;
