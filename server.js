var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    uuid = require("node-uuid"),
    http = require("http"),
    app = express();

app.use(express.static(path.join(__dirname, "public")));

var notes = [{
    _id: uuid.v1(),
    title: "NOTE 1",
    text: "This is the first note",
    order: 0,
}];

app.use(bodyParser.json());

app.get("/notes", function (req, res) {
    res.status(200).json(notes.filter(function (note) {
        return !note._deleted
    }));
});

app.get("/notes/:id", function (req, res) {
    var found = false;

    notes.some(function (note) {
        if (note._id == req.params.id) {
            found = note;
            return true;
        }
    });

    if (!found) {
        res.status(404).end("Note not found");
    }
    else {
        res.status(200).json(found);
    }
});

app.post("/notes", function (req, res) {
    notes.push({
        _id: uuid.v1(),
        title: req.body.title,
        text: req.body.text,
        order: notes.length
    });

    res.status(201).json(notes[notes.length - 1]);
});

app.put("/notes/:id", function (req, res) {
    var found = false;

    notes.some(function (note) {
        if (note._id == req.params.id && !note._deleted) {
            note.title = req.body.title;
            note.text = req.body.text;
            found = note;
            return true;
        }
    });

    if (!found) {
        res.status(404).end("Note not found");
    }
    else {
        res.status(200).json(found);
    }
});

app.delete("/notes/:id", function (req, res) {
    var found = false;

    notes.some(function (note) {
        if (note._id == req.params.id & !note._deleted) {
            note._deleted = true;
            found = note;
            return true;
        }
    });

    if (!found) {
        res.status(404).end("Note not found");
    }
    else {
        res.status(200).json(found);
    }
});

http.createServer(app).listen(8000, function () {
    console.log("Listening on port 8000");
});
