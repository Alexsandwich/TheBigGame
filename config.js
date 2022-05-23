var mysql = function localConnect(){
    //Node Mysql dependency npm install mysql@2.0.0-alpha7
    return require('mysql').createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'kPE`BV%R;8MKbH?"',
        database : 'nodelogin'
    });
}
module.exports.localConnect = mysql;