import studentModal from "../models/student.js"


export const getStudent = async (req, res) => {
    try {
        const student = await studentModal.find({})
        res.status(200).json(student)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postStudnet = async (req, res) => {
    const student = req.body
    const newstudent = new studentModal(student)
    try {
        await newstudent.save()
        res.status(201).json(newstudent)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteStudent = async (req, res) => {
    const id = req.params.id
    try {
        const student = await studentModal.findByIdAndRemove({ _id: id })
        res.status(200).json(student)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}

export const updateStudent = async (req, res) => {
    const id = req.params.id
    try {
        const foundstudent = await studentModal.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(foundstudent)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}
