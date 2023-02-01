const { CustomApiError } = require('../errors/custom-error');

exports.errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, success: false, data: err });
  }
  return res.statu(500).json({
    message: 'Something went wrong, please try again.',
    success: false,
  });
};
