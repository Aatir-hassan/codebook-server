const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = express();

// ✅ CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// ✅ JSON Server router
const router = jsonServer.router("./data/db.json");
server.db = router.db;

// ✅ Middlewares
const middlewares = jsonServer.defaults();
server.use(middlewares);

// ✅ Auth rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});
server.use(rules);
server.use(auth);

// ✅ API routes
server.use(router);


// ✅ Start server
server.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
