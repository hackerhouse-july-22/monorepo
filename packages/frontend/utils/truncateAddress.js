export default function truncateAddress(address, length) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}