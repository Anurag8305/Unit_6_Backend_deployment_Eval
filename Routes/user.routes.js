const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/User.model");

//get
userRouter.get("/", async (req, res) => {
	const user = await UserModel.find();
	if (user) res.send(user);
	else res.send("Could not users");
});

//register
userRouter.post("/register", async (req, res) => {
	const { name, email, gender, password, age, city } = req.body;
	try {
		bcrypt.hash(password, 5, async (err, hash) => {
			if (err) res.send(err.message);
			else {
				const alreay_user = await UserModel.find({ email });
				if (alreay_user.length>0) res.send("User already exist, please login");
				else {
					const user = new UserModel({
						name,
						email,
						gender,
						password: hash,
						age,
						city,
					});
					await user.save();
					res.send({ msg: "User has been registered" });
				}
			}
		});
	} catch (err) {
		res.send({ msg: "Something is wrong", err: err.message });
	}
});

//login
//register
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.find({ email });
		if (user.length > 0) {
			bcrypt.compare(password, user[0].password, (err, result) => {
				if (result) {
					let token = jwt.sign({ userID: user[0]._id }, "shhhhh");
					res.send({ msg: "Logged in", token: token });
				} else {
					res.send({ msg: "Something is wrong", err: err });
				}
			});
		} else res.send({ msg: "Wrong Credentials" });
	} catch (err) {
		res.send({ msg: "Something is wrong", err: err.message });
	}
});

module.exports = { userRouter };
