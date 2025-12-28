const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema ( {

name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    minlength: 6
  } , 

  subscription: {
      type: String,
      enum: ["$9", "$50", "$100", "None"],
      default: "None"
    },role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
},
{ timestamps: true });



module.exports = mongoose.model("User", userSchema);
