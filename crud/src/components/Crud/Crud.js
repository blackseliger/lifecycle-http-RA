import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../FormGroup/FormGroup'
import NoteList from '../NoteList/NoteList'
import NoteModel from '../../Models/NoteModel';
import UpdateIcon from '../../assets/icons/handleUpdate.svg'
const BACKEND_URL = 'http://localhost:7777/notes';


function Crud(props) {


    const [form, setForm] = useState({ content: '' });
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchUpdate();
    }, [])

    const fetchUpdate = async () => {
        const url = BACKEND_URL;
        const response = await fetch(url);
        const data = await response.json();
        setNotes((prevNotes) => data);
    }

    const fetchRemove = async (id) => {
        const url = `${BACKEND_URL}/${id}`
        try {
            const responce = await fetch(url, {
                method: "DELETE",
            });
            return responce;
        } catch (e) {
            console.log(e.message);
        }
    }


    const fetchPost = async () => {
        const url = BACKEND_URL;
        const data = new NoteModel(form.content);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data),
            });
            return response.ok;
        } catch (e) {
            return e.message;
        }
    }



    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await fetchPost();
        await fetchUpdate();
        setForm({ content: '' })
    }

    const handleDelete = async (id) => {
        await fetchRemove(id);
        await fetchUpdate();
    }

    const handleChange = (name, value) => {
        return setForm((prevForm) => ({ ...prevForm, [name]: value }))
    }



    return (
        <div>
            <div className='buttonUpdate'>
                <img src={UpdateIcon} alt="#" onClick={fetchUpdate} />
            </div>
            <FormGroup handleChange={handleChange} handleSubmit={handleSubmit} />
            {notes.length ?
                <NoteList notes={notes} handleDelete={handleDelete} /> : null
            }

        </div>
    )
}

Crud.propTypes = {}

export default Crud
