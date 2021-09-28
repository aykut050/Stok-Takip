const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const pool = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "myS289", (err, user) => {
            if (err) {
                res.json({"err":"Token is not valid!"});
            } else {
                res.json({"ok":"Token is valid!"})
            }
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
})

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "myS289", (err, user) => {
            if (err) {
                res.json({"err":"Token is not valid!"});
            } else {
                req.user = user;
                next();
            }
            
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

const generateAccessToken = (admin) => {
    return jwt.sign({
        userName: admin.admin_user_name,
        password: admin.admin_password
    },
        "myS289", { expiresIn: "24h" })
}

app.post("/addProduct", verify, async (req, res) => {
    let currentDate = new Date();
    if (req.user.exp * 1000 > currentDate.getTime()) {
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
        } catch (err) {
            console.log(err.message)
        }
    }
})

app.post("/api/adminLogin", async (req, res) => {
    const userName = req.body.admin_user_name;
    const password = req.body.admin_password;
    try {
        const admin = await pool.query(
            "SELECT admin_user_name, admin_password FROM admin WHERE admin_user_name = $1 AND admin_password = $2", [
            userName, password
        ]);
        //res.json(admin.rows[0].admin_user_name);
        if (admin) {
            const accessToken = await generateAccessToken(admin.rows[0]);
            res.json({
                userName: admin.rows[0].admin_user_name,
                password: admin.rows[0].admin_password,
                accessToken,
            });
        }
    } catch (err) {
        res.json("Hatalı Giriş Yaptınız");
    }
})

app.get("/getProducts", verify, async (req, res) => {
    let currentDate = new Date();
    if (req.user.exp * 1000 > currentDate.getTime()) {
        try {
            const allProducts = await pool.query("SELECT * FROM urunler");
            res.json(allProducts.rows);
        } catch (err) {
            res.json(err);
        }
    } else {
        res.json("Time Expired");
    }
})

app.put("/editProduct", async (req, res) => {
    try {
        console.log(req.body);
        const updateProduct = await pool.query("UPDATE urunler SET urun_isim = $1, urun_kdv = $2, urun_aciklama = $3, urun_adet = $4, urun_barkod_numarası = $5, urun_kategori = $6, urun_fiyat = $7, urun_guncelleme_tarihi = $8 WHERE urun_id = $9", [
            req.body.productName,
            req.body.productKDV,
            req.body.productDescription,
            req.body.productQuantity,
            req.body.productBarcodeNumber,
            req.body.productCategory,
            req.body.productUnitPrice,
            new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            req.body.productId,
        ]);
        res.json(updateProduct)
    } catch (err) {
        console.log(err.message)
    }
})

app.put("/editProductExist", async (req, res) => {
    try {
        console.log(req.body);
        const updateProduct = await pool.query("UPDATE urunler SET urun_adet = $1 WHERE urun_id = $2", [
            req.body.productQuantity,
            req.body.productId,
        ]);
        res.json(updateProduct)
    } catch (err) {
        console.log(err.message)
    }
})

app.post("/deleteProduct", async (req, res) => {
    try {
        console.log(req.body.deleteProductId)
        const deleteTodo = await pool.query("DELETE FROM urunler WHERE urun_id = $1", [
            req.body.deleteProductId
        ]);
        res.json("Ürün Silindi.")
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server Başlatıldı.")
})