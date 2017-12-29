var controller = require('./../controller/main.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/questions/:id', controller.questionAction);
    app.get('/questions', controller.questionsAction);
};