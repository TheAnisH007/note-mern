import model from "../model/Note.js";
const getAllnotes = async (_, res) => {
    try {
        const notes = await model.find().sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (err) {
        console.error("error in getallnotes")
        res.status(500).json({ message: "cant fetch all notes" })
    }
}
const getsinglenote = async (req, res) => {
    try {
        const singlenote = await model.findById(req.params.id)
        res.status(200).json(singlenote)
    }
    catch (err) {
        console.error("error in getssinglenote")
        res.status(500).json({ message: "id doesnt exist" })
    }
}
const postnote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new model({ title, content })
        const notecreated = await note.save()
        res.status(201).json(notecreated)
    }
    catch (err) {
        console.error('error in postnote')
        res.status(500).json({ message: "cannot post" })
    }
}
const updatenote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = await model.findByIdAndUpdate(req.params.id, { title, content })
        if (!note) return res.status(404).json({ message: "note not found" })
        res.status(200).json({ message: "succesfully udpated" })
    } catch (err) {
        console.error("error in updatenote")
        res.status(500).json({ message: "no id with given id exist" })
    }
}
const deletenote = async (req, res) => {
    try {
        const note = await model.findByIdAndDelete(req.params.id)
        if (!note) return res.status(404).json({ message: "note not found" })
        res.status(200).json(note)
    }
    catch (err) {
        console.log("error in deletenote")
        res.status(500).json({ message: "cannot delete" })
    }
}
const favoritenote = async (req, res) => {
    try {
        const note = await model.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "note not found" })
        note.isFavorite = !note.isFavorite;
        await note.save()
        res.status(200).json(note)
    }
    catch (err) {
        console.log("error in deletenote")
        res.status(500).json({ message: "cannot favorite" })
    }
}
export { getAllnotes, getsinglenote, postnote, updatenote, deletenote, favoritenote }