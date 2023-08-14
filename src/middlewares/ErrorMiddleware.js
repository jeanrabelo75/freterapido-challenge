const errorHandlers = {
  ApiError: (res, error) => {
    res.status(error.status).json({ error: error.message });
  },
  ValidationError: (res, error) => {
    res.status(400).json({ error: error.message });
  },
  DefaultError: (res) => {
    res.status(500).json({ error: 'Internal server error' });
  },
};

function errorMiddleware(error, req, res, next) {
  const errorHandler = errorHandlers[error.constructor.name] || errorHandlers.DefaultError;
  errorHandler(res, error);
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
}

export { errorMiddleware, ApiError, ValidationError };
