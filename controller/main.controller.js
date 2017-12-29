var resource = require('../model/resource.model');
var addressBook = require('../model/addressbook.model')(resource);
var questionModel = require('../model/question.model')();

module.exports = {
    questionsAction: questionsAction,
    questionAction: questionAction
};


// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
addressBook
.init()
.then(addresses => {
    questionModel.add(
        "1",
        "How many women are in the address book?",
        addressBook.fetch({'gender': 'Female'}).length
    );
    questionModel.add(
        "2",
        "Who is the oldest person in the address book?",
        addressBook.sort(['birthday'])[0].name
    );
    questionModel.add(
        "3",
        "How many days older is Bill than Paul?",
        addressBook.diffByDate('Bill', 'Paul')
    );
})
.catch(err => {
    console.log(err);
    throw err;
});

function questionAction (req, res) {
    res.type('text/plain');
    res.send(questionModel.getAnswer(req.params.id));
}

function questionsAction (req, res) {
    res.type('text/plain');
    res.send(questionModel.getAnswers());
}