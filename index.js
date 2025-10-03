// const express = require('express')
// const app = express();
// const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://danishnazakat:danish1@cluster0.rpvrbpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// })
//     .then(() => {

//         console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     });




// app.listen(3000, () => {
//     console.log("Server is running");
// })


// // Defining schema
// // let schemaClass = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: true,
// //     },
// //     age: {
// //         type: Number,
// //         required: true
// //     },
// //     date: new Date.now()
// // });
// // // creating model from the schema
// // let Schema = mongoose.model('Ahmer', schemaClass);

// // let schema1 = new Schema({
// //     name: "GeeksForGeeks"
// // });
// // // will have a default value of John Doe
// // let schema2 = new Schema({});
// app.use(express.json());

// app.post(('/'),(req,res, next)=>{
//     let schemaClass = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//        email: {
//             type: String,
//             required: true,
//         },        password: {
//             type: String,
//             required: true,
//         },
//         // age: {
//         //     type: Number,
//         //     required: true
//         // },
//         // date: new Date.now()
//     });

//     let Schema = mongoose.model('userData', schemaClass);
//     try {
//         const { name, email, password } = req.body;
//         const newUser = new Schema({ name, email, password });
//          newUser.save(); // Inserts a new document
//         // console.log(req.ahmer);
//         res.send('hello world!!!');
//     }catch(err) {
//         res.send({
//             status: 500,
//             message: "server code is failed",
//             err,
//         })
//     }
// })






const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // To parse JSON body

// MongoDB connection
mongoose.connect("mongodb+srv://danishnazakat:danish1@cluster0.rpvrbpd.mongodb.net/myDatabase")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// User model
const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully ✅",
            user: newUser
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
