function status(req, res) {
    // res.status(200).send("Deu tudo certo, status: 200\n")
     res.status(200).json({key: "value"})
}

export default status

