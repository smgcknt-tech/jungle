import mongoose from "mongoose";
import uuid from "node-uuid";

const listSchema = mongoose.Schema({
  listId: { type: String, default: uuid.v4 },
  title: String,
  cards: [
    {
      cardId: { type: String, default: uuid.v4 },
      content: String,
    },
  ],
});

const listInputs = mongoose.model("listInput", listSchema);

export default listInputs;
