const GetIpfsTokenURI = () => {
  const getipfsInfo = async (Nft) => {
    var response = await fetch(`https://ipfs.io/ipfs/${Nft.TokenURI}`);
    var body = await response.json();
    Nft.ipfsInfo = body;
    return { Nft };
  };
  return { getipfsInfo };
};

export default GetIpfsTokenURI;
