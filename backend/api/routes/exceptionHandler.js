function exceptionHandler(err, req, res, next) {
    if (err instanceof _multer.MulterError) {
        res.json({
            success: "Not Ok",
            message: err.message
        });
    } else {
        next(err);
    }
}

module.exports.exceptionHandler = exceptionHandler; 
