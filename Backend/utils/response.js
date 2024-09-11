export default class customError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const successfulResponse = (
  res,
  statusCode,
  message,
  data,
) => {
  res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (
  res,
  error,
  status,
) => {
  console.log(error);
  console.log("\n-----------------------------------------------------\n");
  if (error.name === 'jsonwebtokenerror' ) status = 400;
  res.status(status || 500).json({
    success: false,
    message:error.message || "INTERNAL SERVER ERROR",
    name:error.name || "server",
  });
};

export const validationErrorResponse = (res, errors) => {
  res.status(400).json({
    success: false,
    errors,
  });
};
