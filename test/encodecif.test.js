


describe("Correcto cypher", () => {
  it("deberia retornar 'el cif encriptado'", () => {
    encriptCif = require("../utility/encriptionCif").encriptCif;
    const hex = encriptCif("893217");
    expect(hex).toBe("lV9ZraHzRRyDbUCtF8sg3A==");
  });
  it("deberia returnar los datos bancarios del usuario", () => {
    dataDecrypt = require("../utility/encriptionCif").dataDecrypt;
    const hex = dataDecrypt(
      "A1wuVP+pc95bvz0OyU0wBd86QMzmMCLhslfXVS/f1dG76m7DctTZZV8D0Lodx+cJF3Vuuk1QtXw1WY2AhLqPMErymw/eJxaou6dq6dn/KL0E8INwaHRHQ9PIvrc4R4zIeELdHw8BjLoJ922h+afMMJupORXsL/LcpbVnm74dxuQ8NSqJUnjUjM0kwiC1iD1b1xtpeGfWHojM0s4KT+5nPGbzqXwsMUc29I+GFXbfVgsxg7m/ME707F7QuaChABcXPvdqBwGitGNrX7dVT71Vj82pbBWeupfZtI3jgJTDi+5WiLsVsOv7fWxVJpsFmgBIwaA0XFZfYgH295k/AHESTD84eC0U6D7e5xcPo/lf3ZzcY+o3HLbbOcpq7SAKeeK+4Nwc1Gz6d6Fe+ldDDMA4tRXYM/wxq38CYTOc55KBPdoQjo99ujpoFnRXB2RagSBMR0c3D5YjFUBq3f+US3qeb+Sa8LiXkz8eHQ1XbQcprOmDW8mVKaApfKRlorNxlD23yyR3bNbsMyJACETcl1oy60e9fF1P8xzOTCdk7RHgrstXwmQXgeksZGmrtpp/8LAUL0P60Yb3OQWnifwM+0Gx+lL1NgUyULmh570S62ds+FDtef8bUrrXFgbB2qUowcFpaWhqzwOfj1SMhP5mN6r+lWq5XuubZlXmeVbgASU7tF1PuNEbi4pGljQjkB9EimXm"
    );
    expect(hex).toBe(
      `\"{\\\"data\\\":{\\\"customerId\\\":\\\"893217\\\",\\\"documentNumber\\\":\\\"1707239321\\\",\\\"documentType\\\":{\\\"code\\\":\\\"0001\\\"},\\\"firstName\\\":\\\"MARIA\\\",\\\"secondName\\\":\\\"ESTELA\\\",\\\"thirdName\\\":null,\\\"firstSurname\\\":\\\"PEREZ\\\",\\\"secondSurname\\\":\\\"ANDRADE\\\",\\\"shortName\\\":\\\"PEREZ ANDRADE MARIA ESTELA\\\",\\\"fullName\\\":null,\\\"birthDate\\\":\\\"28011961\\\",\\\"gender\\\":{\\\"code\\\":\\\"0\\\"},\\\"maritalStatus\\\":{\\\"code\\\":\\\"2\\\"},\\\"nationality\\\":\\\"ECUATORIANA\\\",\\\"birthCountry\\\":{\\\"code\\\":\\\"EC\\\"},\\\"birthProvince\\\":{\\\"code\\\":\\\"04\\\"},\\\"birthCity\\\":{\\\"code\\\":\\\"0005\\\"}}}\"`
    );
  });
  it("Deberia retornar un json", () => {
    dataDecrypt = require("../utility/encriptionCif").dataDecrypt;
    remplazarSlashporNada =
      require("../utility/encriptionCif").remplazarSlashporNada;
    const hex = dataDecrypt(
      "A1wuVP+pc95bvz0OyU0wBd86QMzmMCLhslfXVS/f1dG76m7DctTZZV8D0Lodx+cJF3Vuuk1QtXw1WY2AhLqPMErymw/eJxaou6dq6dn/KL0E8INwaHRHQ9PIvrc4R4zIeELdHw8BjLoJ922h+afMMJupORXsL/LcpbVnm74dxuQ8NSqJUnjUjM0kwiC1iD1b1xtpeGfWHojM0s4KT+5nPGbzqXwsMUc29I+GFXbfVgsxg7m/ME707F7QuaChABcXPvdqBwGitGNrX7dVT71Vj82pbBWeupfZtI3jgJTDi+5WiLsVsOv7fWxVJpsFmgBIwaA0XFZfYgH295k/AHESTD84eC0U6D7e5xcPo/lf3ZzcY+o3HLbbOcpq7SAKeeK+4Nwc1Gz6d6Fe+ldDDMA4tRXYM/wxq38CYTOc55KBPdoQjo99ujpoFnRXB2RagSBMR0c3D5YjFUBq3f+US3qeb+Sa8LiXkz8eHQ1XbQcprOmDW8mVKaApfKRlorNxlD23yyR3bNbsMyJACETcl1oy60e9fF1P8xzOTCdk7RHgrstXwmQXgeksZGmrtpp/8LAUL0P60Yb3OQWnifwM+0Gx+lL1NgUyULmh570S62ds+FDtef8bUrrXFgbB2qUowcFpaWhqzwOfj1SMhP5mN6r+lWq5XuubZlXmeVbgASU7tF1PuNEbi4pGljQjkB9EimXm"
    );
    expect(remplazarSlashporNada(hex)).toStrictEqual({
      data: {
        birthCity: { code: "0005" },
        birthCountry: { code: "EC" },
        birthDate: "28011961",
        birthProvince: { code: "04" },
        customerId: "893217",
        documentNumber: "1707239321",
        documentType: { code: "0001" },
        firstName: "MARIA",
        firstSurname: "PEREZ",
        fullName: null,
        gender: { code: "0" },
        maritalStatus: { code: "2" },
        nationality: "ECUATORIANA",
        secondName: "ESTELA",
        secondSurname: "ANDRADE",
        shortName: "PEREZ ANDRADE MARIA ESTELA",
        thirdName: null,
      },
    });
  });
  it("deberia returnar la firma correcta ", () => {
    const Sign = require("../utility/SignEncript");
    const sign = new Sign(
      null,
      "https://api-test.pichincha.com/v2/customers/lV9ZraHzRRyDbUCtF8sg3A==",
      "418c62bb-6658-4370-82ed-a0900eb88cec",
      "GET"
    );
    expect(sign.getSignature()).toBe(
      "QYrvjQZBWlJSuvEduXe/pKavKrvTIL2tHWBCOHRxvGY="
    );
  });
  it("deberia returnar el usuario correcto ",async()=>{
    getCostumer=require("../hooks/apiUser").getCostumer
    const user=await getCostumer("893217")
    expect(user).toStrictEqual({"data": {"birthCity": {"code": "0005"}, "birthCountry": {"code": "EC"}, "birthDate": "28011961", "birthProvince": {"code": "04"}, "customerId": "893217", "documentNumber": "1707239321", "documentType": {"code": "0001"}, "firstName": "MARIA", "firstSurname": "PEREZ", "fullName": null, "gender": {"code": "0"}, "maritalStatus": {"code": "2"}, "nationality": "ECUATORIANA", "secondName": "ESTELA", "secondSurname": "ANDRADE", "shortName": "PEREZ ANDRADE MARIA ESTELA", "thirdName": null}})
})
it("deberia returnar el los datos bancarios correctos ",async()=>{
    getDataBank=require("../hooks/apiUser").getDataBank
    const user=await getDataBank("1712267796")
    expect(user).toStrictEqual({
         "data": [
             {
                 "accountId": "2100212265",
                 "type": {
                     "code": "",
                     "description": "CTA.CTE PERSONAL"
                 },
                 "customer": {
                     "fullname": "MOSQUERA  PONGUILLO JONNY ABEL",
                     "address": {
                         "summary": "MUCHO LOTE 5 MZ. 2592 SL. 17 VILLA ALEGR  A LA ALTURA DEL"
                     }
                 },
                 "status": {
                     "code": "",
                     "description": "ACTIVO"
                 },
                 "openingDate": "06012023",
                 "currency": {
                     "code": "USD",
                     "description": ""
                 },
                 "ownerRole": "PROPIETARIO",
                 "balanceInformation": {
                     "availableBalance": "5000.00",
                     "countableBalance": "5000.00"
                 },
                 "product": {
                     "code": "2101",
                     "description": ""
                 },
                 "subProduct": {
                     "code": "0001",
                     "description": ""
                 },
                 "alias": null,
                 "isPrincipal": "false"
             },
             {
                 "accountId": "2204049016",
                 "type": {
                     "code": "",
                     "description": "TRANSACCIONAL ELECTRONICA"
                 },
                 "customer": {
                     "fullname": "MOSQUERA  PONGUILLO JONNY ABEL",
                     "address": {
                         "summary": "MUCHO LOTE 5 MZ. 2592 SL. 17 VILLA ALEGR  A LA ALTURA DEL"
                     }
                 },
                 "status": {
                     "code": "",
                     "description": "ACTIVO"
                 },
                 "openingDate": "05012023",
                 "currency": {
                     "code": "USD",
                     "description": ""
                 },
                 "ownerRole": "PROPIETARIO",
                 "balanceInformation": {
                     "availableBalance": "5000.00",
                     "countableBalance": "5000.00"
                 },
                 "product": {
                     "code": "2232",
                     "description": ""
                 },
                 "subProduct": {
                     "code": "0003",
                     "description": ""
                 }
             }
         ]
     })
}

)

});
