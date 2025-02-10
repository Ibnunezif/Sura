import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const port = 5000;
const app = express();

dotenv.config();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the view engine

const URL = "https://api.unsplash.com/";
const config = {
  params: {
    client_id: process.env.ACCESS_KEY,
    count:25,
  },
};
var photos;
app.get ("/homepage",(req,res)=>{
  res.render("index",{content:photos})
})

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(URL + "photos/random", config);
    photos = response.data; 
    res.redirect("/homepage"); 
  } catch (error) {
    console.error("Error fetching images:", error);
    res.render("index");
  }
});

app.post ("/search",async(req,res) =>{
  const config={
    params:{
      client_id: process.env.ACCESS_KEY,
      query:req.body.searchQuery,
    }
  }
  try {
    const response = await axios.get(URL + "search/photos", config);
    photos = response.data.results; 
    res.redirect("/homepage"); 
  }catch (error){
   console.log (error)
  }
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});