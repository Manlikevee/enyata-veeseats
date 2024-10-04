import React from 'react'

const Inputcomponent = ({inputState, setInputState, label, inputType, name, id, placeholder, icontype , readonly}) => {
  return (
    <div className="miniforminput">
    <label htmlFor={label}>{label}</label>
    <div className="miniforminputdata">
    {icontype && (<span className="material-symbols-outlined">{icontype}</span>) }
    
        <input type={inputType} name={name} id={id}      
           value={inputState} placeholder={placeholder}   readOnly={readonly ? true : undefined} 
        onChange={(e) => setInputState(e.target.value)}   />
    </div>
    </div> 
     )
}

export default Inputcomponent