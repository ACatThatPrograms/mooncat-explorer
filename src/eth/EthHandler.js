import Web3 from 'web3'
import mooncatAbi from './mooncatAbi';
import wrapperAbi from './wrapperAbi';

const moonCatContract = "0x60cd862c9C687A9dE49aecdC3A99b74A4fc54aB6";
const moonWrapContract = "0x7C40c393DC0f283F318791d746d894DdD3693572";

const CONTRACT_NAMES = {
  MOONCAT: "MOONCAT",
  MOONWRAP: "MOONWRAP",
}

class EthHandler {

  constructor() {
    this.web3 = false;
    this.accounts = [];

    this.moonContract = false;
    this.wrapContract = false;
  }

  /* Private */

  _constructError(msg) {
    return {
      error: true,
      message: msg,
    }
  }

  _haveAccounts() {
    return this.accounts.length > 0;
  }

  async _loadAccounts() {
    let acc = await this.web3.eth.getAccounts();
    this.account = acc;
    return;
  }

  _getContractAddress(contractName) {
    switch (contractName) {
      case CONTRACT_NAMES.MOONCAT: return moonCatContract;
      case CONTRACT_NAMES.MOONWRAP: return moonWrapContract;
      default: throw Error("Trying to fetch nonexistant contract address");
    }
  }

  _getAbi(contractName) {
    switch (contractName) {
      case CONTRACT_NAMES.MOONCAT: return mooncatAbi;
      case CONTRACT_NAMES.MOONWRAP: return wrapperAbi;
      default: throw Error("Trying to fetch nonexistant contract abi");
    }
  }

  _getContract(contractName) {
    switch (contractName) {
      case CONTRACT_NAMES.MOONCAT:
        if (!this.moonContract) {
          let abi = this._getAbi(CONTRACT_NAMES.MOONCAT)
          let contractAddress = this._getContractAddress(CONTRACT_NAMES.MOONCAT);
          let contract = new this.web3.eth.Contract(abi, contractAddress);
          this.moonContract = contract;
        }
        return this.moonContract;
      case CONTRACT_NAMES.MOONWRAP:
        if (!this.wrapContract) {
          let abi = this._getAbi(CONTRACT_NAMES.MOONWRAP);
          let contractAddress = this._getContractAddress(CONTRACT_NAMES.MOONWRAP);
          let contract = new this.web3.eth.Contract(abi, contractAddress);
          this.wrapContract = contract;
        }
        return this.wrapContract;
      default: throw Error("Trying to fetch nonexistant contract");
    }
  }

  /* Public */

  isConnected() {
    return this.web3 !== false;
  }

  async connect() {

    if (window.ethereum) {
      try {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        await this._loadAccounts();
        return { error: false };
      } catch (error) {
        console.error(error);
        if (error.code === 4001) {
          return this._constructError("User rejected request");
        }
      }
    }

    else {
      return this._constructError("No Web3 Wallet Detected!");
    }
  }

  async getCatDetails(mooncatId) {

    // Is wrapperId?
    let isWrapperId = true;
    if (mooncatId[1] === 'x' && mooncatId.length === 12) {
      isWrapperId = false;
    }

    // Get Addresses
    if (!this._haveAccounts()) {
      await this._loadAccounts();
    }

    let mooncatContract = this._getContract(CONTRACT_NAMES.MOONCAT);
    let wrapperContract = this._getContract(CONTRACT_NAMES.MOONWRAP);

    try {
      let catId;
      if (!isWrapperId) {
        catId = mooncatId;
      } else {
        catId = await wrapperContract.methods._tokenIDToCatID(mooncatId).call();
      }

      // Wrapper owener?
      let wrapperOwner = isWrapperId ? await wrapperContract.methods.ownerOf(mooncatId).call() : "n/a";
      let details = await mooncatContract.methods.getCatDetails(catId).call()

      return {
        name: this.web3.utils.hexToAscii(details.name),
        wrapperId: mooncatId,
        catId: catId,
        wrapperOwner: wrapperOwner,
        mcrOwner: details.owner,
        offerPrice: details.requestPrice,
        onlyOfferTo: details.onlyOfferTo,
        requester: details.requester,
        requestPrice: details.requester,
      }

    } catch (ex) {
      console.error(ex)
    }


  }


}

const ethHandler = new EthHandler();
export default ethHandler;