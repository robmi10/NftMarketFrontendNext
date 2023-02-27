import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import NftProvider from "../nftContext/context";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";

import { DAppProvider, Mumbai } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  const config = {
    networks: [Mumbai],
    readOnlyChainId: 80001,
    readOnlyUrls: {
      [80001]: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY}`,
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
