const axios = require('axios').default;

const UserRepository = new (require('./repository'))();

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
        const data = JSON.parse(req.body.payload)

        if (data.actions[0].type == 'button') {
            res.sendStatus(200);
            await saveQuestionOne(data)
        } else {
            res.status(200).send('Thank You!');
            await saveQuestionTwo(data)
        }
    } catch (e) {
        next(e)
    }
}

exports.fetchResponses = async function(req, res, next) {
    try {
        const data = await UserRepository.getAll();
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
}

async function saveQuestionOne(data) {

    const record = {
        user_id: data.user.id,
        username: data.user.username,
        question: 'Welcome. How are you doing?',
        answer: data.actions[0].text.text
    }
    console.log(record)
    
    const new_record = await UserRepository.persist(record);
    console.log(new_record)

    axios.post(`${data.response_url}`, {
        "response_type": "ephemeral",
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
    });
}

async function saveQuestionTwo(data) {
    
    const record = {
        user_id: data.user.id,
        username: data.user.username,
        question: 'What are your favorite hobbies?',
        answer: data.actions[0].selected_options[0].text.text
    }
    console.log(record)
    
    const new_record = await UserRepository.persist(record);
    console.log(new_record)
}