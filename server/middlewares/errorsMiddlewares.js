import ApiError from "../exceptions/apiErrors.js";

export default function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  console.log('\x1b[31m%s\x1b[0m', err);
  return res.status(500).json({ message: "Непредвиденая ошибка" });
}
