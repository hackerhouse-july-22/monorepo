type SnookData = {
  name: string;
  description: string;
  external_url: "https://playsnook.com";
  image: string;
  inGameImage: string;
  imageCID: string;
  inGameImageCID: string;
  snookObject: {
    colors: string[];
    patterns: string[];
    wearables: string[];
    skinId: string;
    stars: string;
    traits: string[];
    score: string;
  };
};

export default SnookData;
