import database from "infra/database.js"

async function status(req, res) {
    const date = new Date()
    const updatedAt = date.toISOString()

    const versionQuery = await database.query("SHOW server_version;")
    const serverVersion = versionQuery.rows[0].server_version

    // const databaseMaxConnection = await database.query("SELECT * FROM pg_stat_activity WHERE state = 'active' ;")
    const showMax = await database.query("SHOW max_connections;")
    var  dbMax = parseInt(showMax.rows[0].max_connections, 10)

    const usedConn = await database.query("SELECT sum(numbackends) FROM pg_stat_database;")
    var dbOpen = parseInt(usedConn.rows[0].sum)

    res.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                version: serverVersion,
                max_connections:  dbMax,
                opened_connections: dbOpen,
            },
        }
    })
}


export default status;

