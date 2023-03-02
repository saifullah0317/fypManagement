import committeeMemberModal from "../models/committeeMember.js";

export const getCommitteeMember = async (req, res) => {
    try {
        const committeeMember = await committeeMemberModal.find({})
        res.status(200).json(committeeMember)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postCommitteeMember = async (req, res) => {
    const committeeMember = req.body
    const newCommitteeMember = new committeeMemberModal(committeeMember)
    try {
        await newCommitteeMember.save()
        return res.status(201).json(newCommitteeMember)

    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export const deleteCommitteeMember = async (req, res) => {
    const id = req.params.id
    try {
        const response = await committeeMemberModal.findByIdAndRemove(id)
        res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({ error: "There is an Error" })
    }
}

export const updateCommitteeMember = async (req, res) => {
    const id = req.params.id
    try {
        const foundCommitteeMember = await committeeMemberModal.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(foundCommitteeMember)
    } catch (error) {
        return res.status(404).json({ error: "There is an Error" })
    }
}