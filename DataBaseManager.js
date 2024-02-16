const mariadb = require('mariadb');

class Database {
  static pool = mariadb.createPool({
    host: 'localhost',
    user: 'antoine',
    password: '123',
    database: 'Johnemon',
    connectionLimit: 5,
  });

  static async executeQuery(query) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const result = await connection.query(query);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } finally {
      if (connection) connection.release(); 
    }
  }
}

module.exports = Database;
