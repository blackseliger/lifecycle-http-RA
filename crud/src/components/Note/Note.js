import React from 'react'
import PropTypes from 'prop-types'
import deleteIcon from '../../assets/icons/handleDelete.svg';
function Note({handleDelete, note}) {
  return (
    <div>
       <div className='deleteICon'>
            <img src={deleteIcon} alt="#" onClick={() => handleDelete(note.id)}/>
       </div>
       {note.content}
    </div>
  )
}

Note.propTypes = {}

export default Note
