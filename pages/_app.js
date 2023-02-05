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

import { ChainId } from "@thirdweb-dev/react";
import { DAppProvider, Localhost } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  const config = {
    networks: [Localhost],
    readOnlyChainId: ChainId.Localhost,
    readOnlyUrls: {
      [ChainId.Localhost]: "http://localhost:7545",
    },
  };
  return (
    <>
      <DAppProvider config={config}>
        <NftProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <ChakraProvider>
              <Layout>
                <Navbar />
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </ThemeProvider>
        </NftProvider>
      </DAppProvider>
    </>
  );
}

export default MyApp;
