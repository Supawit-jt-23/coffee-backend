import express from "express";
import db from "../db_promise.js";
const router = express.Router();

router.post("/api/notes", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "กรุณาส่งข้อความมาด้วย" });

    try {
        // อัปเดตให้ตรงกับคอลัมน์ note ใน DBeaver
        const [result] = await db.execute("INSERT INTO barista_notes (note) VALUES (?)", [message]);
        res.status(201).json({ message: "เพิ่มโน้ตสำเร็จ", note_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;