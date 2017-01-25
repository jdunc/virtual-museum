module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/virtual-museum'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

}
