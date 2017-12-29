var moment = require('moment');
var _ = require('lodash');

class AddressbookModel {

    constructor(resModel) {
        this._resModel = resModel;
    }

    /**
     * Initilizes the address book with the content of the csv file.
     * The loading is managed by the resource model.
     */
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

    /**
     * Converts the raw date string to ISO Date	"2015-03-25"
     * https://www.w3schools.com/js/js_date_formats.asp
     * 
     * @param {String} a raw date string DD/MM/YY
     * @returns {Date} Reformatted ISO Date
     */
    reformatDate(date) {
        return moment(date, 'DD/MM/YY').format('YYYY-MM-DD');
    }

    /**
     * Iterates over elements of collection, returning an array of all elements
     * For more information see
     * https://lodash.com/docs/#filter
     * 
     * @param {Object} an object of format {key: string, value: string}
     * @returns {Array} The filtered array
     */
    fetch(query) {
        return _.filter(this._addresses, query);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results 
     * of running each element in a collection thru each iteratee. 
     * For more information see
     * https://lodash.com/docs/#sortBy
     * 
     * @param {Array} an array of sorting keys 
     * @returns {Array} The sorted address array
     */
    sort(query) {
        return _.sortBy(this._addresses, query);
    }

    /**
     * A specific solution for calculating the days. 
     * TODO: More abstract. Use a database for a query
     * 
     * @param {String} firstKey 
     * @param {String} secondKey 
     */
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