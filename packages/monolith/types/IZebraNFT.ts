export interface IZebraNFT {
  id?: string;
  supplierAddress: string;
  nftAddress: string;
  nftImage: string;
  tokenId: number;
  pricePerSecond: number;
  maxRentDuration: number;
  nonce: number;
  created_at?: string;
  updated_at?: string;
  signature?: string;
}
