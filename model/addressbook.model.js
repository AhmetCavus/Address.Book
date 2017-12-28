var moment = require('moment');
var _ = require('lodash');

class AddressbookModel {

    constructor(resModel) {
        this._resModel = resModel;
    }

    init() {
        return new Promise(
            (resolve, reject) => {
                this._resModel
                .fetchCsv(process.env.CSVFILE)
                .then(addresses => {
                    addresses.forEach(address => {
                        address.birthday = this.reformatDate(address.birthday);
                    });    
                    this._addresses = addresses;
                    resolve(this._addresses);
                })
                .catch(err => {
                    reject(err);
                });
            });
    }

    reformatDate(date) {
        return moment(date, 'DD/MM/YY').format('YYYY-MM-DD');
    }

    fetch(query) {
        return _.filter(this._addresses, query);
    }

    sort(query) {
        return _.sortBy(this._addresses, query);
    }

    diffByDate(firstKey, secondKey) {
        var filtered = [];
        filtered.push(_.find(this._addresses, address => { return address.name.indexOf(firstKey) >= 0 }));
        filtered.push(_.find(this._addresses, address => { return address.name.indexOf(secondKey) >= 0 }));

        filtered = _.orderBy(filtered, 'birthday', 'desc');
        var first = filtered[0];
        var second = filtered[1];
        var res = moment(first.birthday).diff(second.birthday, 'days');
        return res;
    }
}

var addressModel;
module.exports = (resModel) => {
    if(!addressModel) addressModel = new AddressbookModel(resModel);
    return addressModel; 
};