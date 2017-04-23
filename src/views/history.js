import Component from '../component';
import * as Util from '../modules/util';

/** @jsx m */

export default class History extends Component {

  init(ctrl) {
    ctrl.xpubkeys = m.prop([])
    ctrl.addresses = m.prop([])
    ctrl.address = m.prop([])
    ctrl.multisigM = m.prop(2)
    ctrl.history = m.prop([]);
    ctrl.transactions = m.prop({})
    ctrl.count   = m.prop(20);
    ctrl.received = m.prop(0)
    ctrl.spent = m.prop(0)
    ctrl.balance = m.prop(0)
    ctrl.loaded = m.prop(false)
  }

  oppositeRowType(type) {
    return type == 'spend' ? 'output' : 'spend'
  }

  rowName(type) {
    return type == 'spend' ? 'Outgoing' : 'Incoming'
  }

  linkChecksum(row) {
    return this.checksumId({type: this.oppositeRowType(row.type), checksum: row.checksum});
  }

  checksumId(row) {
    return `history_${row.type}_${row.checksum}`
  }

  findPair(ctrl, row) {
    return ctrl.history().find((find_row) => {
      let type = this.oppositeRowType(row.type);
      return find_row.type === this.oppositeRowType(row.type)
        && find_row.checksum === row.checksum
    })
  }

  unspent(ctrl) {
    var unspent = []
    ctrl.history().forEach((row) => {
      if(!this.findPair(ctrl, row)) {
        unspent.push(row)
      }
    })

    return unspent
  }

  calculateBalance(ctrl) {
    ctrl.history().forEach((row) => {
      if(row.type === 'spend') {
        ctrl.spent(ctrl.spent() + this.findPair(ctrl, row).value)
      } else if (row.type === 'output') {
        ctrl.received(ctrl.received() + row.value)
      }
    })
    ctrl.balance(ctrl.received() - ctrl.spent())
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

    historyView(ctrl) {
    return (row) => {
      let pair = this.findPair(ctrl, row)
      return <div id={this.checksumId(row)} class="inout_shell">
        <div class="block_line first solid">
          <div class="block_line_tag">TYPE</div>
          {this.rowName(row.type)}
        </div>
        <div class="block_line">
          <div class="block_line_tag alt">AMOUNT</div>
          <span>1</span>{Util.satoshiToBtc(row.value || pair && pair.value)}
        </div>
        <div class="block_line">
          <div class="block_line_tag alt">BLOCK HEIGHT</div>
          <a href="#" onclick={this.navigate(`/block/${row.height}`)}>{row.height}</a>
        </div>
        <div class="block_line">
          <div class="block_line_tag alt">TRANSACTION</div>
          <a href="#" onclick={this.navigate(`/tx/${row.hash}`)}>{`${row.hash}:${row.index}`}</a>
        </div>
        <div class="block_line">
          <div class="block_line_tag alt">{row.type === 'output' ? 'SPEND' : 'PREVIOUS OUTPUT'}</div>
          <a href={`#${this.linkChecksum(row)}`}>{pair ? `${pair.hash}:${pair.index}` : 'Unspent'}</a>
        </div>
        <div class="horline"></div>
      </div>
    }
  }



}
