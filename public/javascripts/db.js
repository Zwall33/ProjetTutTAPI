import mysql from "mysql";

const config = {
    connectionLimit : 10,
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'Jardin_ptut',
    debug    : false
}

const pool = mysql.createPool(config);                    

function executeQuery(sql, callback) {
    pool.getConnection((err,connection) => {
        if(err) {
            return callback(err, null);
        } else {
            if(connection) {
                connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) {
                    return callback(error, null);
                } 
                return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {    
    executeQuery(sql,function(err, data) {
        if(err) {
            return callback(err);
        }       
        callback(null, data);
    });
}

module.exports = {
    query: query,
}