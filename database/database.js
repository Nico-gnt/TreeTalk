const sqlite3 = require("sqlite3").verbose();
const databaseFile = "./database/database.sqlite";

const connection = new sqlite3.Database(databaseFile, (error) => {
  connectionOpen = true;
  if (error) throw new Error(error);
  return console.log(`connection to ${databaseFile} opened successfully`);
});


function ajouterMessage(userID, message, callback) {
  const query = `INSERT INTO messages (userID, messages) VALUES (?, ?);`;
  connection.run(query, [userID, message], (err) => {
    callback(err, null)
  });
}

function getMessages(callback) {
  const query = 'SELECT * FROM messages;';
  console.log(query);
  connection.all(query, (err, res) => {
    callback(err, res);
  });
}

function clearMessages(callback) {
  const query = 'DELETE FROM messages;';
  connection.run(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

function ajouterCompte(userName, password, callback) {
  const query = 'INSERT INTO compte(userName, password) VALUES(?, ?)';
  connection.run(query, [userName, password], (err) => {
    callback(err);
  });
}

function compteExiste(userName, password, callback) {
  const query = 'SELECT COUNT(*) as count FROM compte WHERE userName = ? AND password = ?';
  connection.get(query, [userName, password], (err, row) => {
    if (err) {
      callback(err);
    } else {
      const count = row.count;
      callback(null, count > 0);
    }
  });
}


const database = {
  close: (callback) => connection.close(callback),
  ajouterMessage,
  getMessages,
  clearMessages,
  ajouterCompte,
  compteExiste,
};

console.log(`database (${databaseFile}) loaded`);

module.exports = database;