/*
  03.11.

   Async Handler Middleware for Fetching Data which will be done using Mongoose
*/

const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
