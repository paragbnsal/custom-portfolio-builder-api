import logger from "./logger.js";

const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (err) {
    if (err.apiError) {
      logger.error(JSON.stringify({ message: err.message }));
    } else {
      logger.error(err.stack);
    }
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      success: false,
      message: err.message,
    });
  }
};

export { asyncHandler };
