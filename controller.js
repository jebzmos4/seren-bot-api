exports.health = async function(req, res, next) {
    try {
        res.status(200).json({ success: true, message: 'Welcome to the Slack bot controller' });
    } catch (e) {
        next(e)
    }
}

exports.messages = async function(req, res, next) {
    try {
        console.log("===>", req.body)
        res.status(200).json({
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Welcome. How are you doing?",
                        "emoji": true
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Doing Well"
                            },
                            "style": "primary",
                            "value": "primary"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Neutral"
                            },
                            "value": "neutral"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Feeling Lucky"
                            },
                            "style": "danger",
                            "value": "lucky"
                        }
                    ]
                }
            ]
        });
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