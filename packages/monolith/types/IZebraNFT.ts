// export interface IZebraNFT {
//   id?: string;
//   supplierAddress: string;
//   nftAddress: string;
//   nftImage: string;
//   tokenId: number;
//   pricePerSecond: number;
//   maxRentDuration: number;
//   nonce: number;
//   created_at?: string;
//   updated_at?: string;
// }

type IZebraNFT = {
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
  renterWalletInfo?: {
    user_wallet_address: string;
    gnosis_safe_address?: string;
  }
}

export default IZebraNFT;