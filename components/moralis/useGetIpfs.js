export function useGetIpfs(option) {
  return { ipfsBody: getIpfsFunc(option) };
}

async function getIpfsFunc(option) {
  if (!option?.TokenURI) return false;
  try {
    var response = await fetch(`https://ipfs.io/ipfs/${option?.TokenURI}`);
    var body = await response.json();
  } catch (error) {
    console.log({ error });
  }
  console.log("body outside", body);
  return body;
}
