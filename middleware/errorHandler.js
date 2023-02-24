const errorHandler = (err, req , res , next) => {
    const statusCode = res.statusCode ? req.statusCode : 400
    res.status(statusCode)
    res.json({
        msg : err.msg,
        stack : process.env.NODE_ENV === 'development' ? err.stack : null
    });
}

module.exports = errorHandler