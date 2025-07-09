const setRateLimit = require("express-rate-limit");


const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Excedió el limite de peticiones por hora, reintente luego.",
  headers: true,
});

module.exports = rateLimitMiddleware;