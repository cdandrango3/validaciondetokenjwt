const validateJwt = require("../service/validator");
const getCostumer = require("../service/getuser").getClient;
async function getCustomerHandler(req, res) {
    const jwt = req.headers["authorization"];
    if (!jwt) {
        return res.status(400).send({ validate: false });
    }

    if (!jwt.startsWith("Bearer ")) {
        return res.status(401).send({ validate: false });
    }

    const token = jwt.slice(7, jwt.length);
    const validationResult = await validateJwt(token);

    if (!validationResult.validate) {
        return res.status(401).send(validationResult);
    }
    try {
        const customerData = await getCostumer(validationResult.cif);
        console.log(customerData);
        return res.status(200).send({ validate: true, data: customerData });
    }
    catch (e) {
        return res.status(401).send({ validate: false });
    }
}

async function validateTokenJwt(req, res) {
    const jwt = req.headers["authorization"];
    if (!jwt) {
        res.status(400).send({ validate: false });
    }
    try {
        if (jwt.startsWith("Bearer ")) {
            const token = jwt.slice(7, jwt.length);
            const result = await validateJwt(token);
            if (result.validate) {
                res.status(200).send(result);
            } else {
                res.status(401).send(result);
            }
        }
    } catch (err) {
        res.status(401).send({ validate: false });
    }
}



module.exports = { getCustomerHandler, validateTokenJwt }