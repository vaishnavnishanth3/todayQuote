import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const app = express();
const port = 3000;

function getDay(req, res, next) {
    const today = req.body["today"];

    if (today === "Saturday" || today === "Sunday") {
        res.locals.quote = "have fun!";
    } else {
        res.locals.quote = "work hard!";
    }

    next();
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", getDay, (req, res) => {
    res.render(__dirname + "/view/index.ejs", { todayQuote: `Hey! It's ${req.body["today"]}, ${res.locals.quote}` });
});

app.listen(port, () => {
    console.log(`Server is up and running. Listening on port ${port}`);
});

