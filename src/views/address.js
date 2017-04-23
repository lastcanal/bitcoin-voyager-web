import Component from '../component';
import header from './header';
import footer from './footer';
import History from './history';
import * as Util from '../modules/util';

/** @jsx m */

export default class Address extends History {

  init(ctrl) {
    super.init(ctrl)

    this.fetchHistory(ctrl);
  }

  onUnload() {
  }

  fetchHistory(ctrl) {
    this.client.fetchAddressHistory2(ctrl.address(), ctrl.count()).then((resp) => {
      ctrl.history(resp.history.sort(this.historySort))
      this.calculateBalance(ctrl)
      m.redraw('diff')
    }).catch((error) => {
      alert(error)
    })
  }

  loadMoreHistory(ctrl) {
    return () => {
      ctrl.count(ctrl.count() + 20);
      ctrl.balance(0)
      this.fetchHistory(ctrl);
    }
  }

  loadMoreHistoryView(ctrl) {
    if (ctrl.history().length < ctrl.count()) return;
    return <div class="row">
      <button class="" onclick={this.loadMoreHistory(ctrl)}>Load More</button>
    </div>
  }
  
  view(ctrl) {
    return <div>
      {header(this)}
      <div class="container">
        <div class="row">
          <div class="body_head">
            <div class="body_head_icon">1</div>
            Bitcoin <span>Address</span>
          </div>
        </div>
        <div class="row">
          <div class="block_shell nomarg">
            <div class="address">
              <div class="address_tag">Address</div>
              <div class="address_icon">I</div>
              {ctrl.address()}
            </div>
            <div class="address">
              <div class="address_tag">Rows: {ctrl.history().length}</div>
              <div class="address_tag">Spent: {Util.satoshiToBtc(ctrl.spent())}</div>
              <div class="address_tag">Received: {Util.satoshiToBtc(ctrl.received())}</div>
              <div class="address_tag">Balance: {Util.satoshiToBtc(ctrl.balance())}</div>
            </div>
          </div>
        </div>
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
        {this.loadMoreHistoryView(ctrl)}
      </div>
      {footer(this)}
    </div>
  }
}
