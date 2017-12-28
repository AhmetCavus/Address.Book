const csv = require('csvtojson');
const fs = require('fs');

function fetchRaw(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 
            (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
                return data;
            }
        );
    });
}

function fetchCsv(filename) {
    return new Promise((resolve, reject) => {
        fetchRaw(filename)
        .then(data => {
            var addresses = [];
            csv()
            .fromString('name, gender, birthday\n' + data)
            .on('json', address => {
                addresses.push(address);
            })
            .on('done', () => {
                resolve(addresses);
            });
        });
    });
}

function fetchJson(filename) {
    return new Promise((resolve, reject) => {
        fetchRaw(filename)
        .then(data => {
            resolve(JSON.parse(data));
        });
    });
}

module.exports = {
    fetchRaw: fetchRaw,
    fetchCsv: fetchCsv,
    fetchJson: fetchJson
};