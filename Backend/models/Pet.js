import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    breed: { type: String, default: "" },

    age: {
      type: Number,
      default: 0,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    emergencyContact: {
      ownerName: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      vetNo: {
        type: String,
        default: "",
      },
    },

    favourites: {
      activities: {
        type: [String],
        default: [],
      },
      treats: {
        type: [String],
        default: [],
      },
      play: {
        type: [String],
        default: [],
      },
    },

    allergies: {
      type: [String],
      default: [],
    },

    schedule: [
      {
        task: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
        },
        recurring: {
          type: Boolean,
          default: false,
        },
      },
    ],
     healthRecords: [
      {
        title: { type: String, default: "" },
        fileUrl: { type: String, required: true },
        fileType: { type: String, enum: ["pdf", "image"], required: true },
        publicId: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Pet", petSchema);
