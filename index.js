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
// server.use(router);


// // ✅ Start server
// server.listen(8000, () => {
//   console.log("🚀 Server running on http://localhost:8000");
// });


const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = express();

// ✅ Allow CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// ✅ Create router
const router = jsonServer.router("./data/db.json");
server.db = router.db;

// ✅ Default middlewares (logger, static, cors, etc.)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// ✅ Auth rules
const rules = auth.rewriter({
  "api/products": 444,
  "api/featured_products": 444,
  "api/orders": 660,
  "api/users": 600,
});

// ✅ Apply rewriter + auth + router under /api
server.use(rules);
server.use(auth);
server.use("/api", router);

// ✅ Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
