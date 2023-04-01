import mongoose from "mongoose";
const userDetailsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
        resume: {
            type: String,
            default: null
        },
        currentCity: {
            type: String,
            default: null
        },
        preferedCity: {
            type: String,
            default: null
        },
        jobs: {
            type: String,
            default: null
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        upvotes: {
            type: String,
            default: null
        },
        downVotes: {
            type: String,
            default: null
        },
        comments: {
            type: String,
            default: null
        }
    }, {
        timeStamps: true,
    }
)

export default mongoose.model("UserDetails",userDetailsSchema)