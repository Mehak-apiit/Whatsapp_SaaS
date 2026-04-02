function successResponse(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
        status: true,
        message,
        data,
        error: null,
    });
}

function errorResponse(res, error, message = 'Internal server error', statusCode = 500) {
    return res.status(statusCode).json({
        status: false,
        message,
        data: null,
        error,
    });
}

export {
    successResponse,
    errorResponse
};