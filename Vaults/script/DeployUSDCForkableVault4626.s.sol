// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {USDCForkableVault4626} from "../src/USDCForkableVault4626.sol";

contract DeployUSDCForkableVault4626 is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address usdc = vm.envAddress("USDC_ADDRESS");

        vm.startBroadcast(pk);
        USDCForkableVault4626 vault = new USDCForkableVault4626(IERC20(usdc));
        vm.stopBroadcast();

        console2.log("USDCForkableVault4626:", address(vault));
        console2.log("asset (USDC):", usdc);
    }
}
