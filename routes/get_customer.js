import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/api/customers/:phone", (req, res) => {
    const phone = req.params.phone;
    const sql = `SELECT * FROM Customer WHERE phone = ?`;
    db.query(sql, [phone], (err, results) => {
        if (err) {
            console.error("GET Error:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "ไม่พบข้อมูล กรุณาตรวจสอบเบอร์",
            });
        }

        res.json({
            data: results[0],
        });
    });
});

export default router;