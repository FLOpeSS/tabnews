import { Client } from "pg"

async function query(queryObject) {

    const client  = new Client({
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host:process.env.POSTGRES_HOST,
        port:process.env.POSTGRES_PORT,
    })

    try {
        await client.connect()
        const res = await client.query(queryObject)
        return res
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        await client.end()
    }
}

export default {
    query:query,
}


