const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path =require("path")
const morgan =require("morgan")
const { fileURLToPath } = require('url');


const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
// //esmoduleFix
const currentFilePath = __filename;
const currentDirname = path.dirname(currentFilePath);
console.log(currentDirname)

app.use(express.static(path.join(currentDirname, "../client/build")));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Time Zone</h1>");
// });

app.use("*", function (req, res) {
  res.sendFile(path.join(currentDirname, "../client/build/index.html"));
});


/* MONGOOSE SETUP */
 
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server Port: ${process.env.PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));