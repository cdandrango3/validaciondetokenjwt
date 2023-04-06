const dotenv = require("dotenv");
dotenv.config();
class Sign {
  xSignature;
  signatureAction;
  verb;
  errorMsj;
  valueToProcess;
  appId;
  apiSecret; //no es el api secret, es la credentials
  guid;
  requestPayload;
  uri;
  constructor(body, uri, guid, requestMethod) {
    this.xSignature = "";
    this.signatureAction = "validate";
    this.verb = requestMethod;
    this.errorMsj = "";
    this.valueToProcess = "";
    this.appId = process.env.APPID;
    this.apiSecret = process.env.APPSECRET;
    this.guid = guid;
    this.requestPayload = body;
    this.uri = uri;
  }
  signSHA256(valueToProcess) {
    console.log(valueToProcess);
    const CryptoJS = require("crypto-js");
    var SHA256 = require("crypto-js/sha256");
    console.log(SHA256(valueToProcess));
    var base64 = CryptoJS.enc.Base64.stringify(SHA256(valueToProcess));
    console.log("base64: " + base64);
    return base64;
  }
  tranformValueToProcess() {
    if (this.verb == "POST" || this.verb == "PUT") {
      var payload = JSON.parse(JSON.stringify(this.requestPayload));
      this.valueToProcess =
        this.appId +
        "|" +
        this.guid +
        "|" +
        JSON.stringify(payload.data) +
        "|" +
        this.apiSecret;
      return this.valueToProcess;
    } else {
      console.log("uri: " + this.uri);
      if (this.signatureAction == "validate") {
        this.valueToProcess =
          this.appId + "|" + this.guid + "|" + this.uri + "|" + this.apiSecret;
      } else if (this.signatureAction == "sign") {
        this.valueToProcess =
          this.appId +
          "|" +
          this.guid +
          "|" +
          JSON.stringify(payload.data) +
          "|" +
          this.apiSecret;
      }
      return this.valueToProcess;
    }
  }
  getSignature() {
    this.valueToProcess = this.tranformValueToProcess();
    this.xSignature = this.signSHA256(this.valueToProcess);
    return this.xSignature;
  }
}
module.exports = Sign;