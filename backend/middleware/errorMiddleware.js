/*
  04.11.

  Error Handler Middleware
*/

// If the error isn't handled by any other middleware, this will do so
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);

	//  Calling next middleware
	next(error);
};

// Overriding the Default Express Error Handler
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// Check for Mongoose Bad ObjectId
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		statusCode = 404;
		message = `Resource Not Found`;
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
	});
};

export { notFound, errorHandler };
