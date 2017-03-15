let path = require('path');

module.exports.USER_HEADERS = ['id', 'name', 'age', 'address', 'team'];
module.exports.USER_DB_PATH = path.join(__dirname,'../db', path.basename('users.json'));