!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var i=r("6JpON");function a(n,t){var o=Math.random()>.3;return new Promise((function(r,a){setTimeout((function(){o?(e(i).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms")),r({position:n,delay:t})):(e(i).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms")),a({position:n,delay:t}))}),t)}))}document.querySelector("form").addEventListener("submit",(function(e){e.preventDefault();for(var n=parseInt(e.target.amount.value,10),t=parseInt(e.target.step.value,10),o=parseInt(e.target.delay.value,10),r=0;r<n;r++){a(r+1,r*t+o).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}}))}();
//# sourceMappingURL=03-promises.60f54de9.js.map