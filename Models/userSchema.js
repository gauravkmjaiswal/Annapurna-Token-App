const { Schema, model } = require("mongoose");
const { createHmac} = require("crypto");
const { createTokenForUser } = require("../services/authJWT");

const userSchema = new Schema(
	{
		studentType:{
			type:Number,
			required:true,
		},
		id: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
);

userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) return;
	const hashedPassword = createHmac("sha256", 'MAJORPROJECT2023')
		.update(user.password)
		.digest("hex");

	this.password = hashedPassword;
	next();
});


const User = model("user", userSchema);
module.exports = User;
