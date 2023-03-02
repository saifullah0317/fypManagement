import departmentModal from "../models/department.js";



export const getDepartment = async (req, res) => {
    try {
        const department = await departmentModal.find({})
        res.status(200).json(department)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postDepartment = async (req, res) => {
    const department = req.body
    const newdepartment = new departmentModal(department)
    try {
        await newdepartment.save()
        res.status(201).json(newdepartment)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteDepartment = async (req, res) => {
    const id = req.params.id
    try {
        const department = await departmentModal.findByIdAndRemove({
            _id: id
        })
        res.status(200).json(department)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}

export const updateDepartment = async (req, res) => {
    const id = req.params.id
    try {
        const founddepartment = await departmentModal.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(founddepartment)
    } catch (error) {
        res.status(404).json({ error: "There is an Error" })
    }
}