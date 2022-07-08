pragma solidity 0.8.15;

import "forge-std/Script.sol";

import "../Zebra.sol";

// works with rinkeby or polygon mainnet
contract DeployAZebraSafeRinkeby is Script {
    function run() public {
        Zebra zebra = Zebra(0xe11470a714BC2061335CC15eBC453B0F95ceF1B5);

        vm.startBroadcast();
        GnosisSafeProxy safe = zebra.createZebraSafe();
        vm.stopBroadcast();

        console.log(address(safe), "zebra zafe");
    }
}