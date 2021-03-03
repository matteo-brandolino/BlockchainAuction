import React from 'react'

function Input({ label, type, name, handleInput}) {
    return (
        <>
            <label className="grey-text">
                {label}
            </label>
            <textarea rows={6} type={type} className="form-control" name={name} onChange={handleInput} />  
        </>
    )
}

export default Input

