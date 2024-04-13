const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!email) {
        return res.status(400).json({ message: 'email is required' });
    }
    if(!emailRegex?.test(email)){
        return res.status(400).json({ message: 'Invalid email address' });
    };
    next(); 
};

module.exports = validateEmail;