const express = require("express");

const path = require("path");
const app = express();

require("./db/conn");
const Register = require("./models/register");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../templates/views");



app.use(express.static(static_path));


app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));




app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {

            const empRegistration = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                password: password,
                confirmpassword: cpassword
            })
            const registered = await empRegistration.save();
            res.status(201).render("index");

        }
        else {
            res.send("password did not match");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email});

            console.log(useremail);
            res.send(useremail);

    } catch (error) {
        res.status(400).send("Invalid login details")

    }
});




app.listen(port, () => {
    console.log(`The server is running at port ${port}`);
})