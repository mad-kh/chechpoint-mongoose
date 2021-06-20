const mongoose = require("mongoose");
//connecting to db
mongoose.connect(
  "mongodb://127.0.0.1/person",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected");
  }
);
//create and save
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String }],
});
//Model
const client = mongoose.model("client", schema);
let client1 = new client({
  name: "khouloud",
  age: 30,
  favoriteFoods: ["pizza", "kouskous", "pasta"],
});
// ave
client1.save((err) => {
  if (err) throw err;
  console.log("saved");
});
// add new user*/
client.create([
  { name: "John", age: 11, favoriteFoods: ["cake", "ice cream", "sweets"] },
  { name: "Mary", age: 20, favoriteFoods: ["pizza", "pasta", "swwets"] },
  { name: "luke", age: 18, favoriteFoods: ["beef", "choklat"] },
  { name: "Cloe", age: 33, favoriteFoods: ["salad", "pasta", "rice"] },
]);
//find many
client.find({}, (err, data) => {
  if (err) console.log("error");
  else console.log(data);
});
/*find by name*/
client.find({ name: "luke" }, (err, data) => {
  if (err) console.log("error");
  else console.log(data);
});
//find by id
client.findById("60cf377a16ed5c1eec51d659", (err, data) => {
  if (err) throw err;
  console.log(data);
});
//Perform Classic Updates by Running Find, Edit, then Save*/
client.findById("60cf377a16ed5c1eec51d659", (err, data) => {
  if (err) {
    console.log(err);
  }
  data.favoriteFoods.push("ma9rouna");
  data.save((err, data) => {
    if (err) {
      console.log(err);
    }

    console.log(data);
  });
});
//Perform Classic Updates by Running Find, Edit, then Save
const client2 = client.findOneAndUpdate(
  { name: "khouloud" },
  { age: 29 },
  { new: true, upsert: true, rawResult: true },
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
//delete one
client.deleteOne({ name: "luke" }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
//dele many
client.remove({ name: "luke" }, (err, data) => {
  if (err) throw err;
  else console.log(data);
});
//Chain Search Query Helpers to Narrow Search Results
client
  .find({ favoriteFoods: { $all: ["burrito"] } })
  .sort({ age: "asc" })
  .limit(4)
  .select({ name: true })
  .exec((error, data) => {
    if (!error) {
      console.log(data);
    }
  });
