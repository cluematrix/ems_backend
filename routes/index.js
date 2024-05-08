
const express = require("express");

const adminRoute = require("./admin.route");
const vendorRoute = require("./vendor.route");
const serviceRoute = require("./masters/service.route");
const locationRouter = require("./masters/location.route");
const eventRouter = require("./event.route");
const router = express.Router();

const defaultRoutes = [
    {
      path: "/admin",
      route: adminRoute,
    },
    {
      path: "/service",
      route: serviceRoute,
    },
    {
      path: "/vendor",
      route: vendorRoute,
    },
    {
      path: "/location",
      route: locationRouter,
    },
    {
      path: "/event",
      route: eventRouter,
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  module.exports = router;