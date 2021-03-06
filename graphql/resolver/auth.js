const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { topics } = require("./merge");

module.exports = {
  //function to create userAccount
  createUser: async (args) => {
    try {
      const myPassRegex = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      );
      const existing = await User.findOne({
        username: args.userInput.username,
      });
      if (existing) {
        throw new Error("User exists already.");
      }

      if (!myPassRegex.test(args.userInput.password)) {
        throw new Error(
          "Password needs to have 8 characters, a number and an Uppercase alphabet"
        );
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        username: args.userInput.username,
        password: hashedPassword,
      });

      const result = await user.save();
      //this one is from moongoo
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  //for login

  login: async (args) => {
    try {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new Error("Please check username");
      }

      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        "somesupersecretkey",
        { expiresIn: "1h" }
      );

      return {
        userName: user.username,
        userId: user.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (err) {
      throw err;
    }
  },
  //for show all users
  users: async (args, req) => {
    try {
      const users = await User.find({ user: req.userId });

      return users.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          createdTopics: topics.bind(this, user._doc.createdTopics),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
