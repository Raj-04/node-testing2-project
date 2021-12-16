const router = require("express").Router()
const Game = require("./games-model")
router.get("/", (req, res) => {
    Game.getAll().then(games => { res.json(games) })
})

router.post("/", async(req, res, next) => {
    try {const newGame = await Game.add(req.body)
    res.status(201).json({ newGame })
} catch {
    next()
}
})

module.exports = router
