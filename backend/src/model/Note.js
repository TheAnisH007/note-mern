import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Note =
    mongoose.models.Note ||
    mongoose.model("Note", schema);

export default Note;