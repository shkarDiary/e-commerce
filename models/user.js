import { Schema, models, model as _model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-collection" }
);

const model = models.user || _model("user", UserSchema);

export default model;
