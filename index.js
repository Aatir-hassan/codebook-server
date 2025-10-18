// const express = require("express");
// const jsonServer = require("json-server");
// const auth = require("json-server-auth");

// const server = express();

// // ✅ CORS headers
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// // ✅ JSON Server router
// const router = jsonServer.router("./data/db.json");
// server.db = router.db;

// // ✅ Middlewares
// const middlewares = jsonServer.defaults();
// server.use(middlewares);

// // ✅ Auth rules
// const rules = auth.rewriter({
//   products: 444,
//   featured_products: 444,
//   orders: 660,
//   users: 600,
// });
// server.use(rules);
// server.use(auth);

// // ✅ API routes
// server.use("/api", router);

// // ✅ Start server
// server.listen(8000, () => {
//   console.log("🚀 Server running on http://localhost:8000");
// });


const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = express();

// ✅ Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// ✅ Create router and access database
const router = jsonServer.router("./data/db.json");
server.db = router.db;

// ✅ Default middlewares (logger, static, cors, no-cache)
server.use(jsonServer.defaults());

// ✅ Define access rules
const rules = auth.rewriter({
  products: 444, // Everyone can read, only admin can write
  featured_products: 444,
  orders: 660, // Only authenticated users can access
  users: 600, // Only admin can access
});
server.use(rules);

// ✅ Setup auth routes (must come before /api)
server.use(auth);

// ✅ Mount JSON server router under /api
server.use("/api", router);

// ✅ Handle 404 fallback
server.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
