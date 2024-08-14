const { readJson, saveJson } = require("../utils")
const jwt = require("jsonwebtoken")
const { v4 } = require("uuid")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readJson("users.json");

        const user = users.find((user) => user.email === email)
        if (!user) return res.status(401).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Password is wrong" });

        const token = jwt.sign(
            {
                username: user.username,
                email: user.email,
                id: user.id,
            },
            process.env.JWT_SECRET
        );

        res.json({
            token,
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const users = readJson("users.json")

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = users.find((user) => user.email === email)
        if (user) return res.status(400).json({ message: "User already exists" })

        const newUser = {
            id: v4(),
            username,
            email,
            password: hashedPassword,
            createdDate: new Date().toISOString(),
        };

        users.push(newUser)
        saveJson("users.json", users)

        res.json(newUser)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal Server error" })
    }
}
module.exports = { login, register }