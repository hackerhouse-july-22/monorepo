/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { MultiSend, MultiSendInterface } from "../MultiSend";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "transactions",
        type: "bytes",
      },
    ],
    name: "multiSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b503060805260805161025261002f6000396000604201526102526000f3fe60806040526004361061001e5760003560e01c80638d80ff0a14610023575b600080fd5b61003661003136600461016b565b610038565b005b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036100cd5760405162461bcd60e51b815260206004820152603060248201527f4d756c746953656e642073686f756c64206f6e6c792062652063616c6c65642060448201526f1d9a584819195b1959d85d1958d85b1b60821b606482015260840160405180910390fd5b805160205b81811015610150578083015160f81c6001820184015160601c601583018501516035840186015160558501870160008560008114610117576001811461012757610132565b6000808585888a5af19150610132565b6000808585895af491505b508061013d57600080fd5b50508060550185019450505050506100d2565b505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561017d57600080fd5b813567ffffffffffffffff8082111561019557600080fd5b818401915084601f8301126101a957600080fd5b8135818111156101bb576101bb610155565b604051601f8201601f19908116603f011681019083821181831017156101e3576101e3610155565b816040528281528760208487010111156101fc57600080fd5b82602086016020830137600092810160200192909252509594505050505056fea26469706673582212207013381f8f0c6ab8a6fd5d265545a180570dfbdcd2a4a8690309b8bab10f37fa64736f6c634300080f0033";

type MultiSendConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiSendConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiSend__factory extends ContractFactory {
  constructor(...args: MultiSendConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MultiSend> {
    return super.deploy(overrides || {}) as Promise<MultiSend>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MultiSend {
    return super.attach(address) as MultiSend;
  }
  override connect(signer: Signer): MultiSend__factory {
    return super.connect(signer) as MultiSend__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiSendInterface {
    return new utils.Interface(_abi) as MultiSendInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiSend {
    return new Contract(address, _abi, signerOrProvider) as MultiSend;
  }
}
