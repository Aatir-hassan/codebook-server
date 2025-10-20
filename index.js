
import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const server = express();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

// ✅ Correct CORS setup
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(express.json());

// ✅ Must come BEFORE json-server router
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

server.use(middlewares);
server.use(rules);
server.use(auth);

// ✅ IMPORTANT: Only use "/api" for your routes, not "/444/"
server.use("/api", router);

server.db = router.db;

server.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
