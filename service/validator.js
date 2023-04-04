const jwt= require('jsonwebtoken');
const axios = require('axios');
const exitsCif = require('./cifexits');
var jwkToPem = require('jwk-to-pem');
const jwksUrl = `https://dev-k36j68uyrenrlbho.us.auth0.com/.well-known/jwks.json`;
async function verifyToken(token) {
    try {
      const jwksResponse = await axios.get(jwksUrl);
      const jwks = jwksResponse.data;
      const decodedToken = jwt.decode(token, { complete: true });
      const { kid } = decodedToken.header;
      const jwk = jwks.keys.find(key => key.kid === kid);
      const verifiedToken = jwt.verify(token, jwkToPem(jwk), { algorithms: ['RS256'] });
     if (verifiedToken) {
        const cif=verifiedToken[process.env.APIAUTH0].codigoCif;
        console.log(cif)
        const result = await exitsCif(cif);
        if (result) {
            return {validate:true, cif:cif};
        }
        else{
            return {validate:false, cif:cif};
        }
     }
    } catch (err) {
      console.error(err);
      throw new Error('Error verifying token');
    }
  }
  module.exports = verifyToken;