const SnookAbi = [
  {
    inputs: [
      {
        internalType: "contract GnosisSafeProxyFactory",
        name: "factory",
        type: "address",
      },
      { internalType: "contract IWEth", name: "WEth", type: "address" },
      {
        internalType: "contract GnosisSafeL2",
        name: "singleton",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract GnosisSafeProxy",
            name: "renter",
            type: "address",
          },
          { internalType: "uint256", name: "endDate", type: "uint256" },
        ],
        internalType: "struct Loan",
        name: "loan",
        type: "tuple",
      },
    ],
    name: "AssetUnavailable",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "payment", type: "uint256" }],
    name: "IncorrectPayment",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "nonce", type: "uint256" }],
    name: "OfferDeleted",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "caller", type: "address" }],
    name: "OrderOnNotOwnedAsset",
    type: "error",
  },
  { inputs: [], name: "UnauthorizedDelegateCall", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "duration", type: "uint256" }],
    name: "UnauthorizedDuration",
    type: "error",
  },
  { inputs: [], name: "UnauthorizedGuardOrModuleUpdate", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "contractCalled", type: "address" },
      { internalType: "bytes", name: "call", type: "bytes" },
    ],
    name: "UnauthorizedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "renter",
        type: "address",
      },
    ],
    name: "UnregisteredRenter",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract GnosisSafeProxy",
        name: "renter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "supplier",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IERC721",
        name: "NFT",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Rent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract GnosisSafeProxy",
        name: "safeProxy",
        type: "address",
      },
    ],
    name: "ZebraSafeDeploy",
    type: "event",
  },
  { stateMutability: "nonpayable", type: "fallback" },
  {
    inputs: [],
    name: "FACTORY",
    outputs: [
      {
        internalType: "contract GnosisSafeProxyFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GNOSIS_SAFE_SINGLETON",
    outputs: [
      { internalType: "contract GnosisSafeL2", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INSTALLER",
    outputs: [
      { internalType: "contract ZebraInstaller", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "contract IWEth", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZEBRA_MODULE",
    outputs: [
      { internalType: "contract ZebraModule", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "txHash", type: "bytes32" },
      { internalType: "bool", name: "success", type: "bool" },
    ],
    name: "checkAfterExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
      { internalType: "enum Enum.Operation", name: "operation", type: "uint8" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "address payable", name: "", type: "address" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "checkTransaction",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "NFT", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "claimAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimDevFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRents",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "claimableBy",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createZebraSafe",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "safe",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "devClaimable",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "devCut",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "contract IERC721", name: "NFT", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "pricePerSecond", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxRentalDuration",
            type: "uint256",
          },
          { internalType: "uint256", name: "nonce", type: "uint256" },
        ],
        internalType: "struct Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "getOfferDigest",
    outputs: [{ internalType: "bytes32", name: "digest", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract GnosisSafeProxy", name: "", type: "address" },
    ],
    name: "isZebraRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "loan",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "renter",
        type: "address",
      },
      { internalType: "uint256", name: "endDate", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minRentalDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minRentalPricePerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "duration", type: "uint256" },
      {
        internalType: "contract GnosisSafeProxy",
        name: "safe",
        type: "address",
      },
      {
        components: [
          { internalType: "contract IERC721", name: "NFT", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "pricePerSecond", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxRentalDuration",
            type: "uint256",
          },
          { internalType: "uint256", name: "nonce", type: "uint256" },
        ],
        internalType: "struct Offer",
        name: "offer",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "rent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "revokeOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "supplierNonce",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "supplierOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default SnookAbi;
