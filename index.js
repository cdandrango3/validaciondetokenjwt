const express = require("express");

const validateJwt = require("./service/validator");
const getCostumer = require("./service/getuser").getClient;
const {
  getUserDeUnaAll,
  getUserByPhone,
} = require("./controller/userController");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/validateJwt", async (req, res) => {
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
});
app.post("/getCostumer", async (req, res) => {
  const jwt = req.headers["authorization"];
  if (!jwt) {
    res.status(400).send({ validate: false });
  }
  try {
    if (jwt.startsWith("Bearer ")) {
      const token = jwt.slice(7, jwt.length);
      const result = await validateJwt(token);
      if (result.validate) {
        const dataUser = await getCostumer(result.cif);
        res.status(200).send(dataUser);
      } else {
        res.status(401).send(result);
        console.log("aqui");
      }
    }
  } catch (err) {
    res.status(401).send({ validate: false });
  }
});
app.get("/allUser", getUserDeUnaAll);
app.post("/getUserByPhone", getUserByPhone);

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
