import sessionModal from "../models/session.js"


export const getSession = async (req, res) => {
    try {
        const session = await sessionModal.find({})
        res.status(200).json(session)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postSession = async (req, res) => {
    const session = req.body
    const newsession = new sessionModal(session)
    try {
        await newsession.save()
        res.status(201).json(newsession)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteSession = async (req, res) => {
    const id = req.params.id
    try {
        const session = await sessionModal.findByIdAndRemove(id)
        res.status(200).json(session)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}

export const updateSession = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const session = await sessionModal.findByIdAndUpdate(id, data)
        res.status(200).send(session)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}
