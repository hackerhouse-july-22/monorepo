
export default interface IZebraNFT {
  id?: string,
  supplierAddress: string,
  nftAddress: string,
  tokenId: number,
  pricePerSecond: number,
  maxRentDuration: number,
  nonce: number,
  created_at?: string,
  updated_at?: string,
}