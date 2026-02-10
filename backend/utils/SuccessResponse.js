/**
 * @param {Response} res 
 * @param {Object} data 
 * @param {Number} statusCode 
 * @param {String} message 
 */
const successResponse = (res, data, statusCode = 200, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export default successResponse;