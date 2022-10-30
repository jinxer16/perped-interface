// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SafeERC20.sol";
import "./SafeMath.sol";
import "./ReentrancyGuard.sol";

contract P2PExchange is ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 amount;
        uint256 depositedTime;

        uint256[] inTime;
        uint256[] inAmount;
        uint256[] outTime;
        uint256[] outAmount;
        
    }

    mapping(address => mapping(address => UserInfo)) public users; // user address => token address => amount 
    address public WETH;
    address[] public tokenList;
    uint256 public fee;
    
    address owner;

    event Deposit(
        address indexed _from,
        address indexed _token,
        uint256 _amount
    );
    event Transfer(
        address indexed _from,
        address indexed _to,
        address indexed _token,
        uint256 _amount
    );

    event DepositETH(address indexed _from, uint256 _amount);
    event TransferETH(
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );

    event Cancel(
        address indexed _token,
        address indexed _user,
        uint256 _amount
    );
    event Revoke(address indexed _token, address indexed _user);
    event CancelETH(address indexed _user, uint256 _amount);
    event RevokeETH(address indexed _user);

    constructor(address _WETH, uint256 _fee) {
        WETH = _WETH; //native token for chain
        fee = _fee;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    //returns owner of the contract
    function getTokenAddress(uint256 _index) public view returns (address) {
        return tokenList[_index];
    }

    //returns owner of the contract
    function getOwner() public view returns (address) {
        return owner;
    }

    //returns balance of token inside the contract
    function getTokenBalance(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    //check whether token exists in polkabridge vault or not
    function existTokenInPool(address _token) public view returns (bool) {
        bool exist = IERC20(_token).balanceOf(address(this)) > 0 ? true : false;
        return exist;
    }

    // transfer token into polkabridge vault
    function depositToken(address _token, uint256 _amount) external {
        
        require(_token != address(0) && _amount > 0, "invalid token or amount");

        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        // UserInfo storage user = users[msg.sender][_token];
        users[msg.sender][_token].amount = users[msg.sender][_token].amount.add(_amount);
        users[msg.sender][_token].depositedTime = block.timestamp;

         users[msg.sender][_token].inTime.push(block.timestamp);
         users[msg.sender][_token].inAmount.push(_amount);

        if (!existTokenInPool(_token)) tokenList.push(_token);

        emit Deposit(msg.sender, _token, _amount);
    }

    // transfer coin into polkabridge vault
    function depositETH() external payable {
        users[msg.sender][WETH].amount =users[msg.sender][WETH].amount.add(msg.value);
        users[msg.sender][WETH].depositedTime = block.timestamp;
        users[msg.sender][WETH].inTime.push(block.timestamp);
        users[msg.sender][WETH].inAmount.push(msg.value);

        emit DepositETH(msg.sender, msg.value);
    }

    // transfer token to destination (user)
    function transferToken(
        address _seller,
        address _buyer,
        address _token,
        uint256 _amount
    ) external onlyOwner nonReentrant {
       
        require(_token != address(0) && _buyer != address(0) && _seller != address(0), "invalid address");
        require(
            users[_seller][_token].amount >= _amount && _amount > 0,
            "Seller have insufficient funds in the pool."
        );
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        require(
            tokenBalance >= _amount && _amount > 0,
            "Insufficient funds in the pool."
        );
        uint256 sendAmount = _amount.mul(100 - fee).div(100); //fee
        IERC20(_token).safeTransfer(_buyer, sendAmount);
       
        users[_seller][_token].amount=  users[_seller][_token].amount.sub(_amount);
        users[_seller][_token].outTime.push(block.timestamp);
        users[_seller][_token].outAmount.push(_amount);
        

        emit Transfer(address(this), _buyer, _token, sendAmount);
    }

    // transfer coin to destination (user)
    function transferETH(
        address _seller,
        address _buyer,
        uint256 _amount
    ) external onlyOwner nonReentrant {
        
        require(_buyer != address(0) && _seller != address(0), "invalid address");
        require(
            users[_seller][WETH].amount >= _amount && _amount > 0,
            "Seller have insufficient ETH in the pool."
        );
         uint256 sendAmount = _amount.mul(100 - fee).div(100); //fee
        payable(_buyer).transfer(sendAmount);
        users[_seller][WETH].amount =users[_seller][WETH].amount.sub(_amount);

        users[_seller][WETH].outTime.push(block.timestamp);
        users[_seller][WETH].outAmount.push(_amount);
        
        emit TransferETH(address(this), _buyer, sendAmount);
    }

    // user can get his cancel transaction amount after deposit token
    function cancelOrder(
        address _token,
        uint256 _amount
    ) public  nonReentrant {

        
        require(
            users[msg.sender][_token].amount >= _amount && _amount > 0,
            "amount exceeds or zero"
        );

        uint256 sendAmount = _amount.mul(100 - fee).div(100); //fee
        IERC20(_token).safeTransfer(msg.sender, sendAmount);

        users[msg.sender][_token].amount =  users[msg.sender][_token].amount.sub(_amount);
       users[msg.sender][_token].outTime.push(block.timestamp);
        users[msg.sender][_token].outAmount.push(_amount);
        

        emit Cancel(_token, msg.sender, _amount);
    }

    // user cancel transaction after deposit coin
    function cancelETHOrder(uint256 _amount)
        public
        
        nonReentrant
    {
        
        require(
            users[msg.sender][WETH].amount >= _amount && _amount > 0,
            "eth amount exceeds or zero"
        );
       
         uint256 sendAmount = _amount.mul(100 - fee).div(100); //fee
        payable(msg.sender).transfer(sendAmount);

        users[msg.sender][WETH].amount = users[msg.sender][WETH].amount.sub(_amount);
         users[msg.sender][WETH].outTime.push(block.timestamp);
        users[msg.sender][WETH].outAmount.push(_amount);
        

        emit CancelETH(msg.sender, _amount);
    }

    // user can withdraw all his funds after deposit token
    function revokeToken(address _token)
        public
        nonReentrant
    {
        
        uint256 amount = users[msg.sender][_token].amount;

        uint256 sendAmount = amount.mul(100 - fee).div(100); //fee      
        IERC20(_token).safeTransfer(msg.sender, sendAmount);
        users[msg.sender][_token].amount=0;

         users[msg.sender][_token].outTime.push(block.timestamp);
        users[msg.sender][_token].outAmount.push(amount);

        emit Revoke(_token, msg.sender);
    }

    // user cancel transaction after deposit coin
    function revokeETH() public  nonReentrant {
        
        
        uint256 amount = users[msg.sender][WETH].amount;
        uint256 sendAmount = amount.mul(100 - fee).div(100); //fee      

      
        payable(msg.sender).transfer(sendAmount);
        users[msg.sender][WETH].amount =0;
         users[msg.sender][WETH].outTime.push(block.timestamp);
        users[msg.sender][WETH].outAmount.push(amount);

        emit RevokeETH(msg.sender);
    }

    // given user address and token, return deposit time and deposited amount
    function getUserInfo(address _user, address _token)
        external
        view
        returns (uint256 _depositedTime, uint256 _amount)
    {
        _depositedTime = users[_user][_token].depositedTime;
        _amount = users[_user][_token].amount;
    }

    function getUserEthInfo(address _user)
        external
        view
        returns (uint256 _depositedTime, uint256 _amount)
    {
        _depositedTime = users[_user][WETH].depositedTime;
        _amount = users[_user][WETH].amount;
    }

    // return eth balance in reserve
    function getEthInReserve() external view returns (uint256 _amount) {
        return address(this).balance;
    }

    // withdraw token
    function withdrawToken(address _token) external onlyOwner nonReentrant {
        uint256 balance = IERC20(_token).balanceOf(address(this));
        require(balance > 0, "not enough amount");
        IERC20(_token).safeTransfer(msg.sender, balance);
    }

    // withdraw ETH
    function withdrawETH() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "not enough amount");
        payable(msg.sender).transfer(balance);
    }

    // withdraw all
    function withdrawAll() external onlyOwner nonReentrant{
        //withdraw all tokens
        for (uint256 i = 0; i < tokenList.length; i++) {
            uint256 balance = IERC20(tokenList[i]).balanceOf(address(this));
            if (balance > 0) IERC20(tokenList[i]).safeTransfer(msg.sender, balance);
        }
        //withdraw ETH
        payable(msg.sender).transfer(address(this).balance);
    }
}
