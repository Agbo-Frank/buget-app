module.exports = {
  "development": {
    "username": "testing_p6bt_user",
    "password": "oR483rNKjiuYAjdzzcX5CyPb87b6XVQ3",
    "database": "testing_p6bt",
    "host": "dpg-cq1hptaj1k6c739mrv90-a.oregon-postgres.render.com",
    "dialect": "postgres",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
