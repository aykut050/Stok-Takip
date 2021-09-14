const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const pool = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// CRUD işlemleri

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "myS289", (err,user)=> {
            if(err) {
                return res.status(403).json("Token not")
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("Nothing");
    }
}

app.post("/addProduct", async (req, res) => {
    try {
        const newProduct = await pool.query(
            "INSERT INTO urunler (urun_isim, urun_kdv, urun_aciklama, urun_adet, urun_barkod_numarası, urun_kategori, urun_fiyat, urun_eklenme_tarihi) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
            [req.body.productName,
             req.body.productKDV,
             req.body.productDescription,
             req.body.productQuantity,
             req.body.productBarcodeNumber,
             req.body.productCategory,
             req.body.productUnitPrice,
             new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')]
        );
    } catch(err) {
        console.log(err.message)
    }
})

let refreshTokens = [];

const generateAccessToken = (admin) => {
    return jwt.sign({ userName:admin.admin_user_name,
        password:admin.admin_password },
        "myS289", { expiresIn: "1h"})
}

const generateRefreshToken = (admin) => {
    return jwt.sign({ userName:admin.admin_user_name,
        password:admin.admin_password },
        "mySR289")
}

app.post("/api/refresh", async (req, res) => {
    const refreshToken = req.body.token;

    if(!refreshToken) return res.status(401).json("You are not authentiacted")
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid!")
    } 
    jwt.verify(refreshToken, "mySR289", (err, admin) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

        const newAccessToken = generateAccessToken(admin);
        const newRefreshToken = generateRefreshToken(admin);

        refreshTokens.push(newRefreshToken)

        res.status(200).json({
            accessToken: newAccessToken, refreshToken: newRefreshToken
        })
    })
})

app.post("/api/adminLogin", async (req, res) => {
    console.log(req.body)
    const userName = req.body.admin_user_name;
    const password = req.body.admin_password;
    try {
        const admin = await pool.query(
            "SELECT admin_user_name, admin_password FROM admin WHERE admin_user_name = $1 AND admin_password = $2", [
                userName, password
            ]);
        //res.json(admin.rows[0].admin_user_name);
        if (admin) {
            const accessToken = generateAccessToken(admin.rows[0]);
            const refreshToken = generateRefreshToken(admin.rows[0]);
            refreshTokens.push(refreshToken)
            res.json({
                userName: admin.rows[0].admin_user_name,
                password: admin.rows[0].admin_password,
                accessToken,
                refreshToken 
            });
        }
    } catch(err) {
        console.log(err.message)
    }
})




app.post("/api/logout", verify, (req,res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    res.status(200).json("Log out")
})

app.delete("/api/users/:userName&:password", verify, (req, res) => {
    if(req.user.userName === req.params.userName && req.user.password === req.params.password) {
        res.status(200).json("Okey")
    } else {
        res.status(403).json("Allowed not")
    }
})

app.get("/getProducts", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM urunler");
        res.json(allTodos.rows);
    }  catch (err) {
        console.log(err.message);
    }
})

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM urunler WHERE urun_id = $1", [
            id
        ]);
        res.json(todo.rows)
    }  catch (err) {
        console.log(err.message);
    }
})

app.put("/todo/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const { desc } = req.body;
        const updateTodo = await pool.query("UPDATE urunler SET urun_isim = $1 WHERE urun_id = $2", [
            desc, id
        ]);
    
        res.json("Todo was updated")
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM urunler WHERE urun_id = $1", [
            id
        ]);

        res.json("Todo was deleted")
    } catch (err) {
        console.log(err.message)
    }
})


app.listen(5000, () => {
    console.log("Server Başlatıldı.")
})