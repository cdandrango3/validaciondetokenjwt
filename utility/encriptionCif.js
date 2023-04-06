const secretKeyInBASE64 = "fGeRNGaqm0WJCfmto9knaPSR5eaD9Aho";
const ivInBASE64 = "uScGfdxh5VTLdIOx";
function encriptCif(Cif) {
  let CryptoJS = require("crypto-js");
  const secretkey = CryptoJS.enc.Utf8.parse(secretKeyInBASE64);
  const ivBase = CryptoJS.enc.Utf8.parse(ivInBASE64);
  const EncriptCif = CryptoJS.AES.encrypt(Cif, secretkey, {
    iv: ivBase,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return EncriptCif.toString();
}
function dataDecrypt(data) {
  let CryptoJS = require("crypto-js");
  var ciphertextWA = CryptoJS.enc.Base64.parse(data);
  const secretkey = CryptoJS.enc.Utf8.parse(secretKeyInBASE64);
  const ivBase = CryptoJS.enc.Utf8.parse(ivInBASE64);
  var encryptedCP = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertextWA,
    formatter: CryptoJS.format.OpenSSL,
  });
  console.log(encryptedCP);
  const dataDecrypt = CryptoJS.AES.decrypt(encryptedCP, secretkey, {
    iv: ivBase,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return dataDecrypt.toString(CryptoJS.enc.Utf8);
}
function remplazarSlashporNada(data) {
  return JSON.parse(data.replace(/\\/g, "").slice(1, -1));
}
module.exports = { encriptCif, dataDecrypt, remplazarSlashporNada };
