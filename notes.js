const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    const duplicateNotes = notes.filter((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        }) 
        saveNotes(notes)
        console.log(chalk.green.inverse(`New note with title: ${title} added!`))
    } else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title
    )
    saveNotes(notesToKeep)

    if (notes.length > notesToKeep) {
        console.log(chalk.green.inverse(`Removed note with title: ${title}`))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(chalk.yellow.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    
    console.log(chalk.inverse('Your Notes:'))

    notes.forEach((note) => {
        console.log(chalk.yellow.inverse(note.title))
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote:    addNote,
    removeNote: removeNote,
    listNotes:  listNotes,
    readNote:   readNote
}

