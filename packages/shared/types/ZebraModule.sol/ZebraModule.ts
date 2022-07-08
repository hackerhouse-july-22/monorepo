/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ZebraModuleInterface extends utils.Interface {
  functions: {
    "giveAllowanceToZebra(address,uint256,address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "giveAllowanceToZebra"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "giveAllowanceToZebra",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "giveAllowanceToZebra",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ZebraModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZebraModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    giveAllowanceToZebra(
      NFT: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      safe: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  giveAllowanceToZebra(
    NFT: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    safe: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    giveAllowanceToZebra(
      NFT: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      safe: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    giveAllowanceToZebra(
      NFT: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      safe: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    giveAllowanceToZebra(
      NFT: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      safe: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
