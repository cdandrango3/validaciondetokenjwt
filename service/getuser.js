const getCostumer = require("../hooks/apiUser").getCostumer;
const getDataBank = require("../hooks/apiUser").getDataBank;
async function getClient(Cif) {
try{
  const dataUser = await getCostumer(Cif);
  if (dataUser && dataUser.data.documentNumber) {
    const dataBank = await getDataBank(dataUser.data.documentNumber);
    if (dataBank ){
    return {
      customer: {
        documentNumber:dataUser.data.documentNumber,
        documentType:dataUser.data.documentType.code,
        customerId:dataUser.data.customerId,
        fullName:`${dataUser.data.firstSurname} ${dataUser.data.secondSurname} ${dataUser.data.firstName} ${dataUser.data.secondName}`,
      },
        account: {
            accountId:dataBank.data[0].accountId,
            balance:dataBank.data[0].balanceInformation.availableBalance,
        }
    };
}
  }
}catch(err){
    throw new Error(err);
}
}
module.exports = { getClient };
