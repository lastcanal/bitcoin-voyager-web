let HISTORY_CURSOR_GAP = 19

export default class HistoryCursor {
  constructor(start_index) {
    this.index = start_index || 0
    this.last_found = start_index || 0
  };

  found() {
    this.last_found = this.index;
    return this.next()
  }

  next() {
    this.index = this.index + 1
    return this
  }

  continuable() {
    return this.index - HISTORY_CURSOR_GAP <= this.last_found
  }
}
