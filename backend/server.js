const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

require("./db") ;

const cors = require("cors") ;
app.use(cors()) ;
app.use(express.json()) ;

const artRoutes = require("./routes/artists") ;
const albRoutes = require("./routes/albums") ;
const sonRoutes = require("./routes/songs") ;

app.use("/artists", artRoutes) ;
app.use("/albums", albRoutes) ;
app.use("/songs", sonRoutes) ;
