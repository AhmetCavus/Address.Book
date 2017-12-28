class QuestionModel {

    constructor() {
        this._questions = [];
        this._formattedAnswers = '';
    }

    add(id, question, answer) {
        var item = { question: question, answer: answer, formattedAnswer: this.formatAnswer(id, answer) };
        this._formattedAnswers += item.formattedAnswer; 
        this._questions[id] = item;
    }

    getAnswer(id) {
        return this._questions[id].formattedAnswer;
    }

    getAnswers() {
        return this._formattedAnswers;
    }

    formatAnswer(id, answer) {
        return id + '. ' + answer + '\n';
    }
    
}

var questionModel;
module.exports = () => {
    if(!questionModel) questionModel = new QuestionModel();
    return questionModel;
}