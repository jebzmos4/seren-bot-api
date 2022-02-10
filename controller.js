const axios = require('axios').default;

exports.health = async function(req, res, next) {
    try {
        res.status(200).json({ success: true, message: 'Welcome to the Slack bot controller' });
    } catch (e) {
        next(e)
    }
}

exports.messages = async function(req, res, next) {
    try {
            res.status(200).json({
            "blocks": [
                {
                    "type": "section",
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
        console.log(req.body)
        res.status(200).send('success');
        const data = JSON.parse(req.body.payload)

        axios.post(`${data.response_url}`, {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "What are your favorite hobbies?"
                    },
                    "accessory": {
                        "type": "checkboxes",
                        "options": [
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Football"
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Music"
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Movies"
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Sleep"
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Basketball"
                                },
                                "value": "value-2"
                            }
                        ],
                        "action_id": "checkboxes-action"
                    }
                }
            ]
        })
          .then( (response) => {
            console.log(response.data);
          })
          .catch ((error) => {
            console.log(error);
          });
    } catch (e) {
        next(e)
    }
}