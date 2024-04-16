const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if(!password) {
        return res.status(400).json({ message: 'password is required' });
    }
    next();
};

module.exports = validatePassword;