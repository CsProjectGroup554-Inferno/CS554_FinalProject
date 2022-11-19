const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient();
const authorizeuser = require("./authorize");
const propertiesData = data.properties;
