import express from "express";
import db from "../db_promise.js";
const router = express.Router();

router.delete("/api/notes/:id", async (req, res) => {
    try {
        await db.execute("DELETE FROM barista_notes WHERE note_id = ?", [req.params.id]);
        res.json({ message: "ลบโน้ตสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;