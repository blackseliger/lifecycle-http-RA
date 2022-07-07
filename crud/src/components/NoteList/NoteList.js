import React from 'react'
import PropTypes from 'prop-types'
import Note from '../Note/Note'

function NoteList({notes, handleDelete}) {
  return (
    <div className='noteList'>
        {notes.map((note) => <Note key={note.id} note={note} handleDelete={handleDelete}/>)}
    </div>
  )
}

NoteList.propTypes = {}

export default NoteList
