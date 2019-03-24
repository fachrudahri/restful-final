'use strict';

const db =require('../config/mysql_config');
const finalRepository = require('../repositories/final_repository');
const Final = require('../domains/final');


//fungsi save
const saveFinalForm = (req, res, next) => {
    res.render('register', {'title': 'Daftar Mahasiswa'});
};
const saveFinal = (req, res, next) => {
    if(!req.body) {
        next('semua field harus di isi');
    };
    const data = req.body;
    const final = new Final(data.code, data.name, data.departement, data.age);
    const finalRepo =new finalRepository(db);
    finalRepo.save(final, result => {
        res.redirect('/');
    }, err => {
        if(err) {
            next(err);
        }
    });
};

//fungsi update
const updateFinalForm = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ditemukan');
    };
    const code = req.params.code;
    const finalRepo = new finalRepository(db);
    finalRepo.findOne(code, result => {
        res.render('update', {'result': result,'title': 'Update Data Pendaftaran'});
    }, err => {
        if(err) {
            next(err);
        }
    });
};
const updateFinal = (req, res, next) => {
    if(!req.body) {
        next('semua field harus di isi');
    };
    const data = req.body;
    const final = new Final(data.code, data.name, data.departement, data.age);
    const finalRepo = new finalRepository(db);
    finalRepo.update(final, result => {
        res.redirect('/')
    }, err => {
        if(err) {
            next(err);
        }
    });
};

//fungsi delete
const deleteFinal = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ditemukan');
    }
    const code = req.params.code;
    const finalRepo = new finalRepository(db);
    finalRepo.delete(code, result => {
        res.redirect('/');
    }, err => {
        if(err) {
            next(err);
        }
    });
};


//fungsi findOne
const findOneFinal = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ditemukan');
    }
    const code = req.params.code;
    const finalRepo = new finalRepository(db);
    finalRepo.findOne(code, result => {
        res.render('detail', {'result': result, 'title': `data dengan code ${code}`})
    }, err => {
        if(err) {
            next(err);
        }
    });
};

//fungsi findAll
const findAllFinal = (req, res, next) => {
    const finalRepo = new finalRepository(db);
    finalRepo.findAll(result => {
        res.render('index', {'results': result, 'title': 'WELCOME HOME DATABASE'});
    }, err => {
        if(err) {
            next(err);
        }
    });
};

module.exports = {
    saveFinalForm: saveFinalForm,
    saveFinal: saveFinal,
    updateFinalForm: updateFinalForm,
    updateFinal:updateFinal,
    deleteFinal: deleteFinal,
    findOneFinal: findOneFinal,
    findAllFinal: findAllFinal
}