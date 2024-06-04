const checkEmptyBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Any changes need to be entered' });
    }
    next();
};

module.exports = { checkEmptyBody };