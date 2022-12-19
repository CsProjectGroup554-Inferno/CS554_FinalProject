const mongoCollections = require("../config/mongoCollections");
const messages = mongoCollections.message;
const { ObjectId } = require("mongodb");

let getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const userCollection = await messages();

        const messages = await userCollection.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

let getMessageById = async (id) => {
    const messageCollection = await messages();
    const mdata = await messageCollection.findOne({ _id: ObjectId(id) });
    if (!mdata) throw "Message not found for this id";
    mdata._id = mdata._id.toString();
    return mdata;
  };

let addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        const userCollection = await messages();
        const newUser = {

            message: { text: message },
            users: [from, to],
            sender: from,
            timestamps: true,

        };
        const newInsertInfo = await userCollection.insertOne(newUser);
        if (newInsertInfo.aknowledged === false) {
            throw "Could not add user";
        }
        const newId = newInsertInfo.insertedId;
        const userData = await getUserById(newId);
        return userData;

    } catch (ex) {
        next(ex);
    }
};

module.exports = {
    getMessages,
    addMessage,
    getMessageById
};