import database from "../../../../infra/database.js"

async function status(req, res) {
    const resu = await database.query("SELECT 1 + 1 as sum")
    console.log(resu.rows)
    res.status(200).json({key: "successfull request to v1"})
}


export default status

