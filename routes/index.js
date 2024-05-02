
const express = require("express");

const adminRoute = require("./admin.route");
const serviceRoute = require("./masters/service.route");
const router = express.Router();

const defaultRoutes = [
    {
      path: "/admin",
      route: adminRoute,
    },
    {
      path: "/service",
      route: serviceRoute,
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  module.exports = router;