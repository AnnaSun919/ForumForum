const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { topics } = require("./merge");

module.exports = {
  createUser: (args) => {
    const myPassRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
    );

    return User.findOne({ username: args.userInput.username })
      .then((user) => {
        if (user) {
          throw new Error("User exists already.");
        }
        if (!myPassRegex.test(args.userInput.password)) {
          throw new Error(
            "Password needs to have 8 characters, a number and an Uppercase alphabet"
          );
        }

        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: args.userInput.username,
          password: hashedPassword,
        });

        return user.save();
      })
      .then((result) => {
        //this one is from moongoo
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  login: async (args) => {
    const user = await User.findOne({ username: args.username });

    if (!user) {
      throw new Error("User doesn't exist");
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
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  users: async (args, req) => {
    try {
      const users = await User.find({ user: req.userId });

      return users.map((user) => {
        return {
          ...user._doc,
          createdTopics: topics.bind(this, user._doc.createdTopics),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
