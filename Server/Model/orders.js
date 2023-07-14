const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
      pUid: {
        type: String,
        required: true,
      },
      cUid: {
        type: String,
        required: true,
      },
      vUid: {
        type: String,
        required: true,
      },
      address: {
        type: Object,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default:"Successfull"
      },
      coupon: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
  );

  
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;