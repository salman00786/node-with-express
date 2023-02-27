const express = require('express');
const debug = require("debug")("app:sessionRouter");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");

const sessionsRouter = express.Router();


sessionsRouter.route("/").get((req, res) => {


    const url = "mongodb+srv://dbUser:Ps4pro+90@globomantics.djlvy.mongodb.net?retryWrites=true&w=majority"
    const dbName = "globomantics";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug("Connected to mongo db")

            const db = client.db(dbName);

            const sessions = await db.collection("sessions").find().toArray();
            res.render("sessions", { sessions });
        } catch (error) {
            debug(error.stack)
        }
        // client.close();
    }());


})

sessionsRouter.route("/:id").get((req, res) => {
    const id = req.params.id;
    res.render("session", {
        session: sessions[id]
    });
});

module.exports = sessionsRouter;
