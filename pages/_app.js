import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import NftProvider from "../nftContext/context";
import { MoralisProvider } from "react-moralis";
import InputfieldSell from "../components/inputfieldSell";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider
        appId="CWGcND4PclcBd3ubnyW2SU9t04Uvqj8NVHI4MXNv"
        serverUrl="https://l8byxuhjvmaz.usemoralis.com:2053/server"
      >
        <NftProvider>
          <Navbar />
          <Component {...pageProps} />
        </NftProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
