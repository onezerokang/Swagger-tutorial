const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const app = express();
const PORT = 3000;

const users = [
  { id: 0, name: "Haha", height: 169 },
  { id: 1, name: "Minsu", height: 181 },
  { id: 2, name: "YJ", height: 150 },
];

const cars = [
  { id: 0, name: "SM3", owner: 0 },
  { id: 1, name: "benz", owner: 1 },
  { id: 2, name: "BMW", owner: 1 },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/users/:id", (req, res) => {
  // #swagger.tags = ["User"]
  // #swagger.summary ="유저를 가져옵니다."
  // #swagger.description = "id와 일치하는 유저를 가져옵니다."

  /*#swagger.responses[200] = {
    description: "여기 설명 넣으시면 됩니다.",
    content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/User'
            }
        }
    }
} */
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.staus(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  // #swagger.tags = ["User"]
  // #swagger.summary ="유저를 가져옵니다."
  // #swagger.description = "id와 일치하는 유저를 가져옵니다."

  /*#swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              }
          }
      }
  } */

  /*#swagger.responses[200] = {
    description: "여기 설명 넣으시면 됩니다.",
    content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/User'
            }
        }
    }
} */
  const user = req.body;
  users.push(users);
  res.status(200).json(user);
});

app.get("/cars/:id", (req, res) => {
  // #swagger.tags = ["Car"]
  // #swagger.summary ="차를 가져옵니다."
  // #swagger.description = "id와 일치하는 차를 가져옵니다."

  /*#swagger.responses[200] = {
    description: "여기 설명 넣으시면 됩니다.",
    content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/Car'
            }
        }
    }
} */
  const car = cars.find((car) => car.id === req.params.id);
  if (!car) {
    return res.staus(404).json({ message: "Car not found" });
  }
  car.owner = users.find((user) => user.id === car.owner);
  res.status(200).json(car);
});

app.listen(PORT, () => console.log(`Server listening on port, ${PORT}`));
