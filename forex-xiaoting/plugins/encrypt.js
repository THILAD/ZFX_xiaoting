const CryptoJS = require("crypto-js");

// encrypt a string
// Vue.prototype.$encryptString = (string, secretKey) => {
//   const encrypted = AES.encrypt(string, secretKey).toString();
//   return encrypted;
// };
export function encryptString(string) {
  string = CryptoJS.AES.encrypt(string, "mysecretkey!1qaz2wsx");
  string = string.toString();
  return string;
}

// decrypt an encrypted string
// Vue.prototype.$decryptString = (encryptedString, secretKey) => {
//   const decrypted = AES.decrypt(encryptedString, secretKey).toString(enc.Utf8);
//   return decrypted;
// };
export function decryptString(encryptedString) {
  encryptedString = CryptoJS.AES.decrypt(
    encryptedString,
    "mysecretkey!1qaz2wsx"
  );
  encryptedString = encryptedString.toString(CryptoJS.enc.Utf8);
  return encryptedString;
}
