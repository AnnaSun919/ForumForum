const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, 12)
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
};

// createUser: async (args) => {
//   try {
//     const exisitingUser = await User.findOne({ email: args.userInput.email });

//     if (exisitingUser) {
//       throw new Error("User exists already");
//     }
//     const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

//     const user = new User({
//       email: args.userInput.email,
//       password: hashedPassword,
//     });
//     const result = await user.save();

//     return { ...result._doc, password: null, _id: result.id };
//   } catch (err) {
//     throw err;
//   }
// }, //match with query scheme
