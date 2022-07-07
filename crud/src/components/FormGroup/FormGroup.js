import React, { useState } from 'react'
import PropTypes from 'prop-types'

function FormGroup({ handleSubmit, handleChange, value }) {

    const onInput = ({ target }) => {
        let { name, value } = target;
        handleChange(name, value);
    }

    const onSubmit = (evt) => {
        return handleSubmit(evt);
    }




    return (
        <form onSubmit={onSubmit} className="form-group" data-element="productForm">
            <input onChange={onInput} className="form-group__control" name="content" type="text" value={value} required placeholder="Name" />
            <button name="save" className="button button_primary">
                Добавить
            </button>
        </form>
    )
}

FormGroup.propTypes = {}

export default FormGroup;
