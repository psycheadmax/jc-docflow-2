class JCDBRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS clients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          lastName TEXT,
          firstName TEXT,
          middleName TEXT,
          birthday DATE,
          gender TEXT`
        return this.dao.run(sql)
    }

    create(lastName, firstName, middleName, birthday, gender) {
        return this.dao.run(
          `INSERT INTO clients (lastName, firstName, middleName, birthday, gender)
            VALUES (?, ?, ?, ?)`,
          [lastName, firstName, middleName, birthday, gender])
      }

      update(task) {
        const { id, lastName, firstName, middleName, birthday, gender } = task
        return this.dao.run(
          `UPDATE clients
          SET lastName = ?,
          firstName = ?,
          middleName = ?,
          birthday = ?,
          gender = ?,
          WHERE id = ?`,
          [lastName, firstName, middleName, birthday, gender, id]
        )
      }

      delete(id) {
        return this.dao.run(
          `DELETE FROM clients WHERE id = ?`,
          [id]
        )
      }

      getById(id) {
        return this.dao.get(
          `SELECT * FROM clients WHERE id = ?`,
          [id])
      }

}

export default JCDBRepository