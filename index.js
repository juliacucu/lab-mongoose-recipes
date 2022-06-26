const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    //Insertar totes les receptes
    Recipe.insertMany(data, (error, recipe) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
    });
  })
  .then(() => {
    //Actualitzar una recepta
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then("succesCallback")
      .catch("errorCallback");
    //Eliminar una recepta
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then("successCallBack")
      .catch("errorCallback");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
