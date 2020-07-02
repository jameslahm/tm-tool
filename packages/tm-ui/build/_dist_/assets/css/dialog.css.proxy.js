const code =
  '/* This code is subject to LICENSE in root of this repository */\r\n\r\n/* Used to detect in JavaScript if apps have loaded styles or not. */\r\n:root {\r\n  --reach-dialog: 1;\r\n}\r\n\r\n[data-reach-dialog-overlay] {\r\n  background: hsla(0, 0%, 0%, 0.33);\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  overflow: auto;\r\n}\r\n\r\n[data-reach-dialog-content] {\r\n  width: 50vw;\r\n  margin: 10vh auto;\r\n  background: white;\r\n  padding: 2rem;\r\n  outline: none;\r\n}\r\n';

const styleEl = document.createElement('style');
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);
