const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/user.routes");
const { postRouter } = require("./Routes/post.routes");
const { authenticate } = require("./Middleware/Middleware.authenticate");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (req, res) => {
	res.send("Homepage");
});
app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
	try {
		await connection;
		console.log("Connected to DB");
	} catch (err) {
		console.log(err.msg);
	}
	console.log(`Server is running at ${process.env.port}`);
});
