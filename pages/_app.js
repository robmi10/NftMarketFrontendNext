import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import NftProvider from "../nftContext/context";
import { MoralisProvider } from "react-moralis";
import InputfieldSell from "../components/inputfieldSell";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import Footer from "../components/footer";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider
        appId="CWGcND4PclcBd3ubnyW2SU9t04Uvqj8NVHI4MXNv"
        serverUrl="https://l8byxuhjvmaz.usemoralis.com:2053/server"
      >
        <NftProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <Layout>
              <Navbar />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </NftProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
