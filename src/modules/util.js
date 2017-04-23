import Big from 'big.js'

const SATOSHI = Big(100000000)

const timeOptions = {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: true
};

export function formatTime(seconds, options=timeOptions) {
  if (+seconds === NaN) return;
  return new Date(+seconds * 1000).toLocaleString('en-US', options);
}

export function satoshiToBtc(satoshi) {
  if (satoshi === undefined) return null;
  return Big(satoshi).div(SATOSHI).toFixed(8)
}


export function elementViewed(el) {
  var top = el.offsetTop;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  return (
    (top + height) <= (window.pageYOffset + window.innerHeight)
  );
}

export function txHashId(hash) {
  return `tx_${hash.slice(0, 16)}`
}

export function loadScript(src) {
  var ref = document.getElementsByTagName('script')[0];
  var node = document.createElement( "script" );
  var callbacks = {}
  var promise = new Promise((resolve, reject) => {
    callbacks = {resolve: resolve, reject: reject};
  });
  setImmediate(function(){
    try {
      node.src = src;
      node.async = true;
      node.onload = callbacks.resolve
      ref.parentNode.insertBefore(node, ref);
    } catch (e) {
      callbacks.reject(e)
    }
  })

  return promise
}
