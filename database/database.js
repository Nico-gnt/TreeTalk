const sqlite3 = require("sqlite3").verbose();
const databaseFile = "./database/database.sqlite";

const connection = new sqlite3.Database(databaseFile, (error) => {
    connectionOpen = true;
    if (error) throw new Error(error);
    return console.log(`connection to ${databaseFile} opened successfully`);
});


function ajouterMessage(userID, message, callback) {
    const query = `INSERT INTO messages (userID, messages) VALUES (${userID}, '${message}');`;
    connection.run(query, (err) => {
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
  

const database = {
    close: (callback) => connection.close(callback),
    ajouterMessage,
    getMessages,
    clearMessages,
};

console.log(`database (${databaseFile}) loaded`);

module.exports = database;