module.exports = {
    dev: {
        connectionString: "postgres://postgres:postgrespw@localhost:55000/videogames",
        port: '3000'
    },
    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + '?ssl=true',
        port: process.env.PORT
    }
}