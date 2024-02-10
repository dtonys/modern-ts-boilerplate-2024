function handleAsyncError(asyncFn) {
    return async (req, res, next) => {
        try {
            await asyncFn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
};

module.exports = {
    handleAsyncError
};
