let LOOK_AHEAD_COUNT = 19

export default class AddressChain {
  constructor(client, ctrl, parent_index) {
    this.client = client
    this.parent_index = parent_index
    this.index = 0
    this.last_found = 0
    this.public_keys = this.derivePublicKeys(ctrl)

    return this.fetch(ctrl)

  }

  derivePublicKeys(ctrl) {
    return ctrl.xpubkeys().map((xpubkey) => {
      return bitcoin.HDNode.fromBase58(xpubkey).derive(0)
    })
  }

  generateP2KH(ctrl) {
    return this.public_keys[0].derive(this.index).getAddress()
  }

  generateP2SH(ctrl) {
    let pubKeys = this.public_keys.map((node) => {
      return node.derive(this.index).getPublicKeyBuffer()
    })
    var redeemScript = bitcoin.script.multisigOutput(ctrl.multisigM(), pubKeys)
    var scriptPubKey = bitcoin.script.scriptHashOutput(bitcoin.crypto.hash160(redeemScript))
    return bitcoin.address.fromOutputScript(scriptPubKey)
  }

  fetch(ctrl) {
    var address = this.public_keys.length == 1 ?
      this.generateP2KH(ctrl) :
      this.generateP2SH(ctrl)

    ctrl.addresses().push(address)
    this.client.fetchAddressHistory2(address, 1000).then(this.fetched(ctrl))
    return address
  }

  fetched(ctrl) {
    return (resp) => {
      if (resp.history.length > 0) {
        ctrl.history(ctrl.history().concat(resp.history).sort(this.historySort))
        this.last_found = this.index
        this.index = this.index + 1
        this.fetch(ctrl)
      } else if (this.index - LOOK_AHEAD_COUNT >= this.last_found) {
        ctrl.loaded(true)
      } else {
        this.index = this.index + 1
        this.fetch(ctrl)
      }
    }
  }

  historySort(row_a, row_b) {
    let height_a = row_a.height || Infinity;
    let height_b = row_b.height || Infinity;
    if (height_a > height_b) return -1;
    if (height_a < height_b) return 1;
    if (row_a.hash > row_b.hash) return 1;
    if (row_a.hash < row_b.hash) return -1;
    return 0;
  }

}
