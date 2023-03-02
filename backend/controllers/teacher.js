import teacherModal from "../models/teacher.js"


export const getTeacher = async (req, res) => {
    try {
        const teacher = await teacherModal.find({})
        console.log(teacher);
        res.status(200).json(teacher)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postTeacher = async (req, res) => {
    const teacher = req.body
    const newTeacher = new teacherModal(teacher)
    try {
        await newTeacher.save()
        res.status(201).json(newTeacher)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteTeacher = async (req, res) => {
    const id = req.params.id
    try {
        const data = await teacherModal.findByIdAndRemove(id)
        res.status(200).json(data)

    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}

export const updateTeacher = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const found = await teacherModal.findByIdAndUpdate(id, data)
        res.status(200).send(found)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}
