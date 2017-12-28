var controller = require('./../controller/main.controller');

module.exports = (app) => {
    app.get('/questions/:id', controller.questionAction);
    app.get('/questions', controller.questionsAction);
};