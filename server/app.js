const connectToDatabase = require("./database/database");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const connectToSocket = require("./socket/socket");
const server = http.createServer(app);
const corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
connectToSocket(server);
app.use("/message/api", require("./routes/message"));
app.use("/auth/", require("./routes/user"));
connectToDatabase(process.env.DATABASE_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
