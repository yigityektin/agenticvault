// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20}          from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20}           from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626}         from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {Ownable}         from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable}        from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract USDCForkableVault4626 is ERC4626, Ownable, Pausable, ReentrancyGuard {
    bool    public forkActive;
    bool    public transfersFrozen;
    bytes32 public forkMerkleRoot;
    address public newTokenHint;

    error TransfersFrozen();

    event ForkActivated(bytes32 merkleRoot, address newTokenHint);
    event TransfersFrozenSet(bool frozen);

    constructor(IERC20 usdc)
        ERC20("USDC Vault Share", "vUSDC") // ERC4626 zaten ERC20’den gelir; burada isim/simge veriyoruz
        ERC4626(usdc)                      // underlying asset = USDC
        Ownable(msg.sender)                // OZ v5: initial owner
    {}

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20) // ERC4626 -> ERC20’den gelir
    {
        if (transfersFrozen && from != address(0) && to != address(0)) {
            revert TransfersFrozen();
        }
        super._update(from, to, value);
    }

    function activateFork(bytes32 merkleRoot, address _newTokenHint) external onlyOwner {
        require(!forkActive, "fork active");
        forkActive      = true;
        forkMerkleRoot  = merkleRoot;
        newTokenHint    = _newTokenHint;
        transfersFrozen = true;
        emit ForkActivated(merkleRoot, _newTokenHint);
        emit TransfersFrozenSet(true);
    }

    function setTransfersFrozen(bool frozen) external onlyOwner {
        transfersFrozen = frozen;
        emit TransfersFrozenSet(frozen);
    }

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function deposit(uint256 assets, address receiver)
        public
        override
        nonReentrant
        whenNotPaused
        returns (uint256 shares)
    {
        return super.deposit(assets, receiver);
    }

    function mint(uint256 shares, address receiver)
        public
        override
        nonReentrant
        whenNotPaused
        returns (uint256 assets)
    {
        return super.mint(shares, receiver);
    }

    function withdraw(uint256 assets, address receiver, address owner)
        public
        override
        nonReentrant
        returns (uint256 shares)
    {
        return super.withdraw(assets, receiver, owner);
    }

    function redeem(uint256 shares, address receiver, address owner)
        public
        override
        nonReentrant
        returns (uint256 assets)
    {
        return super.redeem(shares, receiver, owner);
    }
}
