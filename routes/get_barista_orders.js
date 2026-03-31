import express from "express";
import db from "../db_promise.js";

const router = express.Router();

router.get("/api/barista/board", async (req, res) => {
    try {
        const [orders] = await db.execute("SELECT * FROM orders WHERE status = 'pending'");
        const [notes] = await db.execute("SELECT * FROM barista_notes ORDER BY note_id DESC");

        for (let i = 0; i < orders.length; i++) {
            const [items] = await db.execute(`
                SELECT oi.*, m.menu_name 
                FROM order_item oi
                JOIN Menu m ON oi.menu_id = m.menu_id
                WHERE oi.order_id = ?
            `, [orders[i].order_id]);
            orders[i].items = items; 
        }

        res.json({ orders, notes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;