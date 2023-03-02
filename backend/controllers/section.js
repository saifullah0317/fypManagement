import sectionModal from "../models/section.js";

export const getSection = async (req, res) => {
    try {
        const section = await sectionModal.find({})
        res.status(200).json(section)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postSection = async (req, res) => {
    const section = req.body
    const newSection = new sectionModal(section)
    try {
        await newSection.save()
        res.status(201).json(newSection)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteSection = async (req, res) => {
    const id = req.params.id
    try {
        const section = await sectionModal.findByIdAndRemove(id)
        res.status(200).json(section)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}

export const updateSection = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const section = await sectionModal.findByIdAndUpdate(id, data)
        res.status(200).send(section)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}