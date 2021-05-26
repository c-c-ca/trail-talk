// const mongoose = require('mongoose');
// const User = mongoose.model('users');
// const generateToken = require('../../utils/generateToken');

// const profileToEmail = ({ emails: [{ value: email }] }) => email;

// module.exports = idName => async (accessToken, refreshToken, profile, done) => {
//   const email = profileToEmail(profile);
//   const { id } = profile;
//   let user;

//   try {
//     user = await User.findOne({ email });
//     if (user && !user.isActive) {
//       await User.findByIdAndDelete(user.id);
//     }

//     user = await User.findOne({ [idName]: id });
//     if (user) return done(null, user);

//     const userInfo = {
//       [idName]: id,
//       usernameToken: generateToken(),
//     };

//     if (email) {
//       userInfo.email = email;
//     }

//     done(null, await new User(userInfo).save());
//   } catch (err) {
//     done(err);
//   }
// };
