const transformIpfsUrl = (ipfsUrl?: string) =>
  ipfsUrl
    ? `https://ipfs.io/ipfs/${ipfsUrl.replace("ipfs://", "")}`
    : undefined;

export default transformIpfsUrl;
