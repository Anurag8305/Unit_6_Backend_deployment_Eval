const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
	const token = req.headers.authorization;
	//console.log(token)
	if (token) {
		jwt.verify(token, "shhhhh", (err, decoded) => {
			if (decoded) {
				req.body.userID = decoded.userID;
				console.log("decoded",decoded.userID);
				next();
			} else {
				res.send({ msg: "Please Login 1" });
			}
		});
	} else {
		res.send({ msg: "Please Login 2" });
	}
};

module.exports = { authenticate };
