// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import {USDCForkableVault4626} from "../src/USDCForkableVault4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("USD Coin", "USDC") {}
    function decimals() public pure override returns (uint8) { return 6; }
    function mint(address to, uint256 amt) external { _mint(to, amt); }
}

contract USDCForkableVault4626_Test is Test {
    MockUSDC usdc;
    USDCForkableVault4626 vault;

    address alice = address(0xA11CE);
    address bob   = address(0xB0B);

    function setUp() public {
        usdc  = new MockUSDC();
        vault = new USDCForkableVault4626(IERC20(address(usdc)));
        usdc.mint(alice, 1_000_000e6);
    }

    function test_DepositAndRedeem_1to1() public {
        vm.startPrank(alice);
        usdc.approve(address(vault), type(uint256).max);

        uint256 shares = vault.deposit(100e6, alice);
        assertEq(shares, 100e6, "shares mismatch");
        assertEq(usdc.balanceOf(address(vault)), 100e6, "vault USDC");
        assertEq(vault.balanceOf(alice), 100e6, "alice shares");

        uint256 assetsOut = vault.redeem(100e6, alice, alice);
        assertEq(assetsOut, 100e6, "assets out mismatch");
        assertEq(usdc.balanceOf(address(vault)), 0, "vault USDC after redeem");
        assertEq(vault.balanceOf(alice), 0, "alice shares after redeem");

        vm.stopPrank();
    }

    function test_Fork_Then_BlockTransfers_But_DepositRedeem_Work() public {
        vm.startPrank(alice);
        usdc.approve(address(vault), type(uint256).max);
        vault.deposit(10e6, alice);
        vm.stopPrank();

        bytes32 root = keccak256("snapshot");
        vm.prank(vault.owner());
        vault.activateFork(root, address(0xDEAD));

        vm.startPrank(alice);
        vm.expectRevert(USDCForkableVault4626.TransfersFrozen.selector);
        vault.transfer(bob, 1e6);

        usdc.approve(address(vault), type(uint256).max);
        vault.deposit(1e6, alice);
        vault.redeem(1e6, alice, alice);
        vm.stopPrank();
    }
}
