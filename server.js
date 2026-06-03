const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "bloodbank"
});

db.connect(err => {
    if(err){
        console.log(" DB connection failed:",err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Test API
app.get("/", (req, res) => {
    res.send("Server Working");
});


// =============================
// USER REGISTER API (FIXED)
// =============================
app.post("/register", (req, res) => {

    const {name, email, phone, password} = req.body;

    const sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, password], (err, result) => {

        if(err){
            console.log(err);
            return res.json({success:false, message:"Database error"});
        }

        return res.json({success:true});
    });

});


// =============================
// USER LOGIN API (ADDED)
// =============================
app.post("/login", (req, res) => {

    const {email, password} = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if(err){
            return res.json({success:false});
        }

        if(result.length > 0){
            return res.json({success:true});
        } else {
            return res.json({success:false});
        }
    });

});


// =============================
// DONOR REGISTER API (UPDATED)
// =============================
app.post("/donor", (req, res) => {

    const {
        name,
        age,
        weight,
        infection,
        blood,
        city,
        contact
    } = req.body;

    // =============================
    // SAME DAY DUPLICATE CHECK
    // =============================
    const checkSql = `
    SELECT * FROM donors
    WHERE contact = ?
    AND created_at = CURDATE()
    `;

    db.query(checkSql, [contact], (checkErr, checkResult) => {

        if(checkErr){
            console.log(checkErr);
            return res.json({success:false});
        }

        // Duplicate Found
        if(checkResult.length > 0){
            return res.json({
                success:false,
                message:"Donor already registered today"
            });
        }

        // =============================
        // INSERT DONOR
        // =============================
        const sql = `
        INSERT INTO donors
        (name, age, weight, infection, blood, city, contact, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
        `;

        db.query(
            sql,
            [name, age, weight, infection, blood, city, contact],
            (err, result) => {

            if(err){
                console.log(err);
                return res.json({
                    success:false,
                    message:"Error saving donor"
                });
            }

            return res.json({
                success:true,
                message:"Donor Registered Successfully"
            });
        });

    });

});


// =============================
// BLOOD REQUEST API (UPDATED)
// =============================
app.post("/request", (req, res) => {

    const {
        patient,
        blood,
        units,
        city,
        contact,
        emergency
    } = req.body;

    const sql = `
    INSERT INTO requests
    (patient, blood, units, city, contact, emergency)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [patient, blood, units, city, contact, emergency],
        (err, result) => {

        if(err){
            console.log(err);

            return res.json({
                success:false,
                message:"Database Error"
            });
        }

        return res.json({
            success:true,
            message:"Blood Request Submitted Successfully"
        });

    });

});


// =============================
// GET DONORS (SEARCH) (ADDED)
// =============================
app.get("/donors", (req, res) => {

    const sql = "SELECT * FROM donors";

    db.query(sql, (err, result) => {
        if(err){
            return res.json([]);
        }
        return res.json(result);
    });

});


// =============================
// 🔥 GET REQUESTS (ADDED - IMPORTANT)
// =============================
app.get("/requests", (req, res) => {

    const sql = "SELECT * FROM requests";

    db.query(sql, (err, result) => {
        if(err){
            return res.json([]);
        }
        return res.json(result);
    });

});


// =============================
// GET ADMIN DATA (ADDED)
// =============================
app.get("/admin-data", (req, res) => {

    let data = {};

    db.query("SELECT COUNT(*) as totalDonors FROM donors", (err, donors) => {
        db.query("SELECT COUNT(*) as totalRequests FROM requests", (err, requests) => {
            db.query("SELECT COUNT(*) as totalUsers FROM users", (err, users) => {

                data = {
                    donors: donors[0].totalDonors,
                    requests: requests[0].totalRequests,
                    users: users[0].totalUsers
                };

                res.json(data);
            });
        });
    });

});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});