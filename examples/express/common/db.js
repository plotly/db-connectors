const logger = require('winston');
const sqlite3 = require('sqlite3').verbose();

// open database in memory
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    logger.error(`Error initializing sqlite 3 ${err}`);
    return err;
  }
  logger.info('Connected to the in-memory SQlite database.');
});

// close the database connection
db.close((err) => {
  if (err) {
    logger.error(`Error closing sqlite 3 ${err}`);
    return err.message;
  }
  logger.info('Close the database connection.');
});