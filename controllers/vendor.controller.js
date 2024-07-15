const httpStatus = require("http-status");
require("dotenv").config();
const { Vendor } = require("../models");
const { Service } = require("../models");
const { servicePackage } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addVendor = async (req, res) => {
  try {

    req.body.is_active = 1;
    const image = req.file ? req.file.path : null;
    req.body.logo_image = image;
    const spkg = await servicePackage.findOne({
      where: { is_delete: false, id: req.body.service_pkg_id },
    });
    const now = new Date();
    // console.log(now);
    const expdays =
      now.getTime() + spkg["validity_in_days"] * 24 * 60 * 60 * 1000;
    const expiry_date = new Date(expdays);
    req.body.expiry_date = expiry_date.toISOString().split("T")[0];
    // console.log(expiry_date);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const vendor = new Vendor(req.body);
    await vendor.save();
    res
      .status(httpStatus.CREATED)
      .json({ msg: "Vendor Added Successfully", vendor: req.body });
  } catch (error) {
    console.error("Error saving vendor data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

const loginVendor = async (req, res) => {
  try {
    const { mobile_no, password } = req.body;
    console.log(req.body);
    const admin = await Vendor.findOne({ where: { mob_no: mobile_no } });
    if (!admin) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Invalid mobile number or password" });
    }
    admin.is_delete == true
      ? res
          .status(httpStatus.FORBIDDEN)
          .json({ error: "Your account is deleted" })
      : "";
    admin.is_active == false
      ? res
          .status(httpStatus.FORBIDDEN)
          .json({ error: "Your account is deactive" })
      : "";
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Invalid mobile number or password" });
    }
    const token = jwt.sign({ adminId: admin.id }, "Bearar");
    if (admin) {
      res.status(httpStatus.OK).json({
        msg: `Welcome ${admin.company_name}`,
        token: token,
        data: admin,
      });
    } else {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Invalid email or password3" });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "server error" });
  }
};

const getVendor = async (req, res) => {
  try {
    const spkg = await Vendor.findAll({ where: { is_delete: false } });
    res
      .status(httpStatus.OK)
      .json({ msg: "Vendor Fetch Successfully", vendor: spkg });
  } catch (error) {
    console.error("Error saving vendor data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

module.exports = {
  addVendor,
  getVendor,
  loginVendor,
};
