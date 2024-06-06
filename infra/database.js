import { Client } from "pg"

async function query(queryObject) {

    const client  = new Client({
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host:process.env.POSTGRES_HOST,
        port:process.env.POSTGRES_PORT,
    })
    await client.connect()
    const res = await client.query(queryObject)
    await client.end()
    return res
}

export default {
    query:query,
}
