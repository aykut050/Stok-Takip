const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// CRUD işlemleri

app.post("/todos", async (req, res) => {
    try {

        const newTodo = await pool.query(
            "INSERT INTO urunler (urun_isim, urun_barkod_numarası) VALUES($1,$2)",
            [req.body.desc, 154]
        );
        
        res.json(newTodo);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/todos", async (req, res) => {
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