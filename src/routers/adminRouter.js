const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();


adminRouter.route("/").get((req, res) => {
    const url = "mongodb+srv://dbUser:Ps4pro+90@globomantics.djlvy.mongodb.net?retryWrites=true&w=majority"
    const dbName = "globomantics";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug("Connected to mongo db")

            const db = client.db(dbName);

            const response = await db.collection("sessions").insertMany(sessions);
            res.json(response);
        } catch (error) {
            debug(error.stack)
        }
        // client.close();
    }());
})

module.exports = adminRouter;