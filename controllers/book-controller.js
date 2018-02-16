const connection = require('../config.js');

module.exports = {
    all: function(req, res) {
        connection.query('SELECT * FROM books', (err, rows) => {
            if(!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': rows
                    })
                );
            }
            else {
                res.status(400).send(err);
            }
        });
    },

    create: function(req, res, next) {
        let response;
        const name = req.body.name;
        const isbn = req.body.isbn;
        if(
            typeof 'undefined' !== name &&
            typeof 'undefined' !== isbn
        ) {
            connection.query(
                'INSERT INTO books (name,isbn)' +
                'VALUES (?,?)',
                [name, isbn],
                function(err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                }
            );
        }
        else {
            response = {
                'result' : 'error',
                'msg' : 'Porfa fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },

    get: function (req,res) {
        connection.query(
            'SELECT * ' +
            'FROM books ' +
            'WHERE id = ?' +
            'LIMIT 1',
            [req.params.id],
            (err, rows) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': rows[0]
                    })
                );
            }
        )
    },

    update: function (req,res) {
        let response;
        const name = req.body.name;
        const isbn = req.body.isbn;
        if(
            typeof 'undefined' !== name &&
            typeof 'undefined' !== isbn
        ) {
            connection.query(
                'UPDATE books' +
                'SET name = ?, isbn = ?' +
                'WHERE id = ?',
                [name, isbn, id],
                function(err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                }
            );
        }
        else {
            response = {
                'result' : 'error',
                'msg' : 'Porfa fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },

    destroy: function (req,res) {
        connection.query(
            'DELETE FROM books WHERE id = ?',
            [req.params.id],
            function(err, result) {
                handleSuccessOrErrorMessage(err, result, res);
            }
        );
    },

    handleSuccessOrErrorMessage(err, result, res) {
        if (!err) {
            if (0 !== result.affectedRows) {
                response = {'result' : 'success'};
            }
            else {
                response = {'msg' : 'No Result Found'};
            }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
        }
        else {
            res.status(400).send(err);
        }
    }
};