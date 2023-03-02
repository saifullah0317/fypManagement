import commitieModal from "../models/commitie.js";


export const getCommitie = async (req, res) => {
    try {
        const commitie = await commitieModal.find({})
        res.status(200).json(commitie)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postCommitie = async (req, res) => {
    const commitie = req.body
    const newCommitie = new commitieModal(commitie)
    try {
        await newCommitie.save()
        return res.status(201).json(newCommitie)

    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export const deleteCommitie = async (req, res) => {
    const id = req.params.id
    try {
        const response = await commitieModal.findByIdAndRemove(id)
        res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({ error: "There is an Error" })
    }
}

export const updateCommitie = async (req, res) => {
    const id = req.params.id
    try {
        const foundCommitie = await commitieModal.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(foundCommitie)
    } catch (error) {
        return res.status(404).json({ error: "There is an Error" })
    }
}
