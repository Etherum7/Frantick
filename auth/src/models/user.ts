import mongoose from "mongoose";

import { Password } from "../services/password";

//interface for creating a new User
interface userAttrs {
  email: string;
  password: string;
}

//interface for single user document

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

//interface for UserModel

interface UserModel
  extends mongoose.Model<UserDocument> {
  build(attrs: userAttrs): UserDocument;
}

// options to remove certain fields from the returned mongo doc when it is built

//Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },

  {
    toJSON: {
      transform(doc, returned) {
        returned.id = returned._id;
        delete returned._id;
        delete returned.password; // remove password field in returned object
        delete returned.__v;
      },
    },
  }
);

// statics method acts on whole model
userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};
//* Pre save hook run everytime we save runs every time
userSchema.pre("save", async function (done) {
  // we have to pass in done as mongose does not know when the async function endds
  if (this.isModified("password")) {
    const hashed = await Password.toHash(
      this.get("password")
    );
    this.set("password", hashed);
  }
  done();
});

// while instance methods act on  particular
//userSchema.methods.name=()=>{}

// make a model

//angle brackets are for generic types a type that function wants
//more better than any type when we want to know what to return based on type
export const User = mongoose.model<
  UserDocument,
  UserModel
>("User", userSchema);
