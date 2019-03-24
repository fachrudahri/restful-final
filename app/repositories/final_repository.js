'use strict';

const Final = require('../domains/final');

const finalRepository = function(db) {
    this.db = db;
}

finalRepository.prototype = {

    save: function(s, cb, errCb) {
        const db = this.db;
        const data = {code: s.code, name: s.name, departement: s.departement, age: s.age};
        const query = 'INSERT INTO student SET ?';
        db.query(query, data, (err, result) =>{
            if(err) {
                errCb(err);
            }
            cb(result);
        });
    },

    update: function(s, cb, errCb) {
        const db = this.db;
        const data = [s.name, s.departement, s.age, s.code];
        const query = 'UPDATE student SET name = ?, departement = ?, age = ? WHERE code = ?';
        db.query(query, data, (err ,result) => {
            if(err) {
                errCb(err);
            }
            cb(result);
        });
    },

    delete: function(code, cb, errCb) {
        const db = this.db;
        const query = 'DELETE FROM student WHERE code = ?';
        db.query(query, [code], (err, result) => {
            if(err) {
                errCb(err);
            }
            cb(result);
        });
    },

    findOne: function(code, cb, errCb) {
        const db = this.db;
        const query = 'SELECT * FROM student WHERE code = ?';
        db.query(query, [code], (err, results, fields) => {
            if(err) {
                errCb(err);
            }
            const result = results[0];
            if(!result) {
                cb(`data dengan code ${code} tidak ditemukan`);
            }
            const final = new Final(result.code, result.name, result.departement, result.age);const query = 'SELECT * FROM student';
            cb(final);
        });
    },

    findAll: function(cb, errCb) {
        const db = this.db;
        const query = 'SELECT * FROM student';
        db.query(query, (err, results, fields) => {
            if(err) {
                errCb(err);
            }
            const getAll = [];
            for(let i = 0; i<results.length ; i++) {
                const get = results[i];
                const final = new Final(get.code, get.name, get.departement, get.age);
                getAll.push(final);
            }
            cb(getAll);
        });
    }

};

module.exports = finalRepository;