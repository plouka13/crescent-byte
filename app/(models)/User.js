import { Int32 } from "mongodb";
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    level: Number,
    avatar: Number,
    border: Number,
    displayBadge: Number,
    experience: Number,
    first_login: Boolean,
    achievements: [Number],
    watched_stocks: [String],
    curr_holdings: [{ stock: String, amount: Number }],
    pending_investments: [
      {
        stock: String,
        amount: Schema.Types.Decimal128,
        buy_date: Date,
        sell_date: Date,
        stock_value: Schema.Types.Decimal128,
        currency: String,
      },
    ],
    curr_investments: [
      {
        stock: String,
        amount: Schema.Types.Decimal128,
        buy_date: Date,
        sell_date: Date,
        stock_value: Schema.Types.Decimal128,
        currency: String,
      },
    ],
    prev_investments: [
      {
        stock: String,
        amount: Schema.Types.Decimal128,
        buy_date: Date,
        sell_date: Date,
        stock_value: Schema.Types.Decimal128,
        currency: String,
      },
    ],
    balance: Number,
    opt_in: Boolean,
    settings: {
      mode: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
