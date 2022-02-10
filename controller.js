exports.health = async function(req, res, next) {
    try {
        res.status(200).json({ success: true, message: 'Welcome to the Slack bot controller' });
    } catch (e) {
        next(e)
    }
}

exports.messages = async function(req, res, next) {
    try {
        res.status(200).json({ success: true, message: 'This is the messages endpoint' });
    } catch (e) {
        next(e)
    }
}

exports.callback = async function(req, res, next) {
    try {
        res.status(200).json({ success: true, message: 'This is the callback endpoint' });
    } catch (e) {
        next(e)
    }
}