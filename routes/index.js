
const express = require("express");

const adminRoute = require("./admin.route");
const vendorRoute = require("./vendor.route");
const serviceRoute = require("./masters/service.route");
const locationRouter = require("./masters/location.route");
const eventRouter = require("./event.route");
const LoginRouter = require("./login.route");
const CustomerRouter = require("./customer.route");
const expenseRouter = require("./expense.route");
const employeeRouter = require("./employee.route");
const GalleryRouter = require("./gallery.route");
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
    },
    {
      path: "/login",
      route: LoginRouter,
    },
    {
      path: "/customer",
      route: CustomerRouter,
    },
    {
      path: "/expense",
      route: expenseRouter,
    },
    {
      path: "/employee",
      route: employeeRouter,
    },
    {
      path: "/gallery",
      route: GalleryRouter,
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  module.exports = router;