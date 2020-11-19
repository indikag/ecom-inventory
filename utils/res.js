/**
 * Request execution success.
 * @param {request} res 
 * @param {response data} data 
 * @param {response message} message 
 */
exports.success = (res, data, message) => {
    res.status(200).send({
        data: data,
        message: message === undefined ? 'Success' : message
    });
}

/**
 * Request has not provided required parameters.
 * @param {request} res 
 * @param {response data} data 
 * @param {response message} message 
 */
exports.badrequest = (res, data, message) => {
    res.status(400).send({
        data: data,
        message: message === undefined ? 'Bad request' : message
    });
}

/**
 * Request execution failed.
 * @param {request} res 
 * @param {response data} data 
 * @param {response message} message 
 */
exports.error = (res, message) => {
    res.status(500).send({
        message: message === undefined ? 'Error' : message
    });
}