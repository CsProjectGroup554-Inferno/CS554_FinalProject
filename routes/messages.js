const router = require("express").Router();
const authorizeuser = require("./authorize");
const mongoCollections = require("../config/mongoCollections");
const dMessage = mongoCollections.message;
const data = require("../data");
const messageData = data.message;
const { ObjectId } = require("mongodb");


router.post("/addmsg/", async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        console.log("hh1" + JSON.stringify({ from, to, message }))
        const userCollection = await dMessage();
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
        const userData = await messageData.getMessageById(newId);
        return userData;
    } catch (ex) {
        next(ex);
    }
});

router.post("/getmsg/", async (req, res, next) => {
    try {

        const { from, to } = req.body;
        // console.log("hh3"+JSON.stringify({ from, to }) )
        const userCollection = await dMessage();

        const messages = await userCollection.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 }).toArray();
        // console.log("hh2"+JSON.stringify(messages))

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        // console.log("hh1"+JSON.stringify(projectedMessages))
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;