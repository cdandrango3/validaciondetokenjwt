const axios = require("axios");
const encriptionCif = require("../utility/encriptionCif");
const dataDecrypt = encriptionCif.dataDecrypt;
const encriptCif = encriptionCif.encriptCif;
const remplazarSlashporNada = encriptionCif.remplazarSlashporNada;
const Sign = require("../utility/SignEncript");
async function getCostumer(Cif) {
  const CifEncript = encriptCif(Cif);
  const xguid = "418c62bb-6658-4370-82ed-a0900eb88cec";
  const apicredential =
    "ZkdlUk5HYXFtMFdKQ2ZtdG85a25hUFNSNWVhRDlBaG86dVNjR2ZkeGg1VlRMZElPeA==";
  const xSignature = new Sign(
    null,
    `https://api-test.pichincha.com/v2/customers/${CifEncript}`,
    "418c62bb-6658-4370-82ed-a0900eb88cec",
    "GET"
  );
  const headers = {
    "X-Api-Credentials": apicredential,
    "X-Device-IP": "200.10.89.34",
    "X-Guid": xguid,
    "X-Device": "29xp3L6xJCaTSmWsQHsIsIqiyoU7Z0Az+EfYl2Bq5e0=",
    "X-Session": "3e80ddc9-29fb-4c99-b82e-403287fe4ce5",
    "X-Signature": xSignature.getSignature(),
  };
  try {
    const response = await axios.get(
      `https://api-test.pichincha.com/v2/customers/${CifEncript}`,
      { headers: headers }
    );
    return remplazarSlashporNada(dataDecrypt(response.data));
  } catch (error) {
    console.log(error);
  
  }
}
async function getDataBank(CI) {
  const apicredential =
    "ZkdlUk5HYXFtMFdKQ2ZtdG85a25hUFNSNWVhRDlBaG86dVNjR2ZkeGg1VlRMZElPeA==";
  const xguid = "b292bed18ac34a26bdc021ace9033b19";
  const headers = {
    "X-Apigee-Credentials": apicredential,
    "X-Device-IP": "200.10.89.34",
    "X-Guid": xguid,
    "X-Device": "9939aadd00ee32",
    "X-Session": "a9fd8deb-2aad-4d88-a7e3-d153c9e44b66",
  };
  try {
    const response = await axios.get(
      `https://api-test.pichincha.com/customer-products-services/v1/products/accounts?documentNumber=${CI}&documentType=0001`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
   
  }
}
module.exports = { getCostumer, getDataBank };