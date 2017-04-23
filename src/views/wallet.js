import Component from '../component';
import header from './header';
import footer from './footer';
import * as Util from '../modules/util';
import AddressChain from '../modules/address_chain';
import HistoryCursor from '../modules/history_cursor';

import History from './history';

let BITCOIN_JS_SRC = "/assets/bitcoinjs.min.js"

let SPEND = 0
let CHANGE = 1

/** @jsx m */


export default class Wallet extends History {

  init(ctrl) {
    super.init(ctrl)
    Util.loadScript(BITCOIN_JS_SRC).then(() => {
      ctrl.xpubkeys([])

      m.redraw('full')

      this.fetchWallet(ctrl)
    })
  }

  onUnload() {
  }

  reset(ctrl) {
    ctrl.addresses([])
    ctrl.history([])
    ctrl.balance(0)
    ctrl.spent(0)
    ctrl.received(0)
  }

  fetchWallet(ctrl) {
    if (ctrl.xpubkeys().length == 0) return
    this.reset(ctrl)
    this.fetchBIP44(ctrl)
  }

  fetchBIP44(ctrl) {
    this.fetchHistory(ctrl, SPEND)
    this.fetchHistory(ctrl, CHANGE)
  }

  fetchHistory(ctrl, parent_index, start_index) {
    var cursor = new HistoryCursor(start_index)
    return this.fetchAddressHistory(ctrl, cursor, ctrl.xpubkeys().map((xpubkey) => {
      return bitcoin.HDNode.fromBase58(xpubkey).derive(parent_index)
    }))
  }

  generateAddress(ctrl, cursor, nodes) {
    return nodes.length == 1 ?
      this.generateP2KH(ctrl, cursor, nodes) :
      this.generateP2SH(ctrl, cursor, nodes)
  }

  generateP2KH(ctrl, cursor, nodes) {
    return nodes[0].derive(cursor.index).getAddress()
  }

  generateP2SH(ctrl, cursor, nodes) {
    let pubKeys = nodes.map((node) => {
      return node.derive(cursor.index).getPublicKeyBuffer()
    })
    var redeemScript = bitcoin.script.multisigOutput(ctrl.multisigM(), pubKeys)
    var scriptPubKey = bitcoin.script.scriptHashOutput(bitcoin.crypto.hash160(redeemScript))
    return bitcoin.address.fromOutputScript(scriptPubKey)
  }

  fetchAddressHistory(ctrl, cursor, nodes) {
    var address = this.generateAddress(ctrl, cursor, nodes)
    ctrl.addresses().push(address)
    this.client.fetchAddressHistory2(address, 1000)
      .then(this.fetchedAddressHistory(ctrl, cursor, nodes))

    m.redraw('diff')
  }

  fetchedAddressHistory(ctrl, cursor, nodes) {
    return (resp) => {
      if (resp.history.length > 0) {
        ctrl.history(ctrl.history().concat(resp.history).sort(this.historySort))
        return setImmediate(this.fetchAddressHistory.bind(this), ctrl, cursor.found(), nodes)
      } else if (cursor.continuable()) {
        return setImmediate(this.fetchAddressHistory.bind(this), ctrl, cursor.next(), nodes)
      }

      m.redraw('diff')
    }
  }

  calculateBalance(ctrl) {
    ctrl.history().forEach((row) => {
      if(row.type === 'spend') {
        ctrl.spent(ctrl.spent() + this.findPair(ctrl, row).value)
      } else if (row.type === 'output') {
        ctrl.received(ctrl.received() + row.value)
      }
    })

    if (ctrl.received() > 0) {
      this.calculateUnspentBalance(ctrl)
    }
  }

  calculateUnspentBalance(ctrl) {
   this.unspent(ctrl).map((row) => {
      var transactions = ctrl.transactions()
      transactions[row.hash] = transactions[row.hash] || this.client.fetchBlockchainTransaction(row.hash).then((resp) => {
        let balance = ctrl.balance() + resp.transaction.outputs[row.index].value
        ctrl.balance(balance)
      })
      ctrl.transactions(transactions)
    })
  }

  updateXpubkey(ctrl, prevXpubkey) {
    return (e) => {
      let xpubkeys = ctrl.xpubkeys()
      let xpubkey = e.target.value
      let index = xpubkeys.indexOf(prevXpubkey)
      if (!prevXpubkey || index == -1) {
        xpubkeys.push(xpubkey)
      } else {
        if (xpubkey) {
          xpubkeys[index] = xpubkey
        } else {
          xpubkeys.splice(index, 1)
        }
        ctrl.xpubkeys(xpubkeys)
      }
      this.fetchWallet(ctrl)
    }
  }

  displayXpubkey(ctrl){
    return (xpubkey) => {
      return <div>
        <input onchange={this.updateXpubkey(ctrl, xpubkey)} value={xpubkey}></input>
      </div>
    }
  }

  displayAddress(ctrl){
    return (address) => {
      return <div>
      {address.type} - 
      {address.index} - 
      {address}
      </div>
    }
  }

  changeMultisigM(ctrl) {
    return (e) => {
      ctrl.multisigM(+e.target.value)
      this.fetchWallet(ctrl)
    }
  }
  
  displayMultisigOptions(ctrl) {
    return <div>
      <label>Signatures Required</label>
      <input type="number" onchange={this.changeMultisigM(ctrl)} value={ctrl.multisigM()}></input>
      <label>Keys</label>
      <input type="number" value={ctrl.xpubkeys().length}></input>

      {this.calculateBalance(ctrl)}
    </div>
  }

  view(ctrl) {
    return <div>
      {header(this)}
      <div class="container">
        <div class="row">
          <div class="body_head">
            <div class="body_head_icon">1</div>
            Bitcoin <span>Wallet</span>
          </div>
        </div>
        <div class="row">
          <div class="block_shell nomarg">
            <div class="address">
              <div class="address_tag">HD Public Keys</div>
              <div class="address_icon">I</div>
              {ctrl.xpubkeys().map(this.displayXpubkey(ctrl))}
              {this.displayXpubkey(ctrl)('')}
            </div>
          </div>
        </div>
        {ctrl.xpubkeys().length > 1 ? this.displayMultisigOptions(ctrl) : ''}
              <div class="address_tag">Balance: {Util.satoshiToBtc(ctrl.balance())}</div>
              <div class="address_tag">Received: {Util.satoshiToBtc(ctrl.received())}</div>
              <div class="address_tag">Spent: {Util.satoshiToBtc(ctrl.spent())}</div>
              <div class="address_tag">Rows: {ctrl.history().length}</div>
              <div class="address_tag">Addresses Searched: {ctrl.addresses().length}</div>
        <div class="row">
          <div class="inout_arrow_down"></div>
        </div>
        <div class="row">
          <div class="block_shell">
            <div class="inout_head">
              <div class="inout_head_icon">J</div>Address Transactions
            </div>
            {ctrl.history().map(this.historyView(ctrl))}
          </div>
        </div>
      </div>
      {footer(this)}
    </div>
  }
}

