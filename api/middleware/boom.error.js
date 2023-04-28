export const boomErrorLogin = (err, req, res, next) => {
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
  next();
}
