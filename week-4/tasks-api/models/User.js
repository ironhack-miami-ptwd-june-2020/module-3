const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String },
        password: { type: String },
        email: { type: String },
        profileImage: {
            type: String,
            default: "/images/yoda-default-icon.png",
        },
        tasks: { type: [{ type: Schema.Types.ObjectId, ref: "Task" }] },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
