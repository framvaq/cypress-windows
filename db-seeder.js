const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = {
  seed: function (state) {
    let adapter = new FileSync('db.json');
    let db = low(adapter);
    db.setState(state).write();
  }
};
