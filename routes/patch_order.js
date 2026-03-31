import express from "express";
import db from "../db_promise.js";

const router = express.Router();

router.patch("/api/orders/:id/status", async (req, res) => {
    try {
        // อัปเดตสถานะเป็น completed ทันทีเมื่อเรียกใช้เส้นทางนี้
        await db.execute("UPDATE orders SET status = 'completed' WHERE order_id = ?", [req.params.id]);
        res.json({ message: "อัปเดตสถานะออเดอร์เป็นเสร็จสิ้นแล้ว" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;