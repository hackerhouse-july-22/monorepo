
ZEBRA_TEST_ABI = """
[
    {
      "inputs": [
        {
          "internalType": "contract GnosisSafeProxyFactory",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "contract IWEth",
          "name": "WEth",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "payment",
          "type": "uint256"
        }
      ],
      "name": "IncorrectPayment",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        }
      ],
      "name": "OfferDeleted",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "UnauthorizedDuration",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnauthorizedGuardOrModuleUpdate",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "contract GnosisSafeProxy",
          "name": "renter",
          "type": "address"
        }
      ],
      "name": "UnregisteredRenter",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract GnosisSafeProxy",
          "name": "safeProxy",
          "type": "address"
        }
      ],
      "name": "ZebraSafeDeploy",
      "type": "event"
    },
    {
      "stateMutability": "nonpayable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txHash",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "name": "checkAfterExecution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "internalType": "enum Enum.Operation",
          "name": "operation",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "safeTxGas",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "baseGas",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "gasPrice",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "gasToken",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "refundReceiver",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "signatures",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "msgSender",
          "type": "address"
        }
      ],
      "name": "checkTransaction",
      "outputs": [],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "createZebraSafe",
      "outputs": [
        {
          "internalType": "contract GnosisSafeProxy",
          "name": "safe",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract IERC721",
              "name": "NFT",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pricePerSecond",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxRentalDuration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            }
          ],
          "internalType": "struct Offer",
          "name": "offer",
          "type": "tuple"
        }
      ],
      "name": "getOfferDigest",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "digest",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract GnosisSafeProxy",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isZebraRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minRentalDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minRentalPricePerSecond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC721",
          "name": "NFT",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "contract GnosisSafeProxy",
          "name": "safe",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "contract IERC721",
              "name": "NFT",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pricePerSecond",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxRentalDuration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            }
          ],
          "internalType": "struct Offer",
          "name": "offer",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "rent",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "supplierNonce",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateOffers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
"""