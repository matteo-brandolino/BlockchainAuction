
function Input({ label, type, name, handleInput}) {
    return (
        <>
            <label className="grey-text">
                {label}
            </label>
            <input type={type} className="form-control" name={name} onChange={handleInput} />  
        </>
    )
}

export default Input
