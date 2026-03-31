import express from "express";
import db from "../db_promise.js";
const router = express.Router();

router.put("/api/notes/:id", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "กรุณาส่งข้อความใหม่มาด้วย" });

    try {
        // อัปเดตให้ตรงกับคอลัมน์ note ใน DBeaver
        await db.execute("UPDATE barista_notes SET note = ? WHERE note_id = ?", [message, req.params.id]);
        res.json({ message: "แก้ไขโน้ตสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;