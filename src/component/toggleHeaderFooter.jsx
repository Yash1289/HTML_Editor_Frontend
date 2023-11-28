import React, { useState } from 'react'
import './toggleHeaderFooter.css';

const ToggleHF = ({ formData, handleChange }) => {

  //Using Inline Function and the The Logical Not (!) to toggle state
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="hf-button">
            { toggle ? "Hide Page Styles" : "Show Page Styles"}
      </button>

    {toggle && (
    <div className={`centered-form ${toggle ? 'visible' : ''}`}>
        <form>
          <div className="form-group">
              <input type="text" id="header" name="header" placeholder='Enter Header' value={formData.header} onChange={handleChange} />
          </div>

          <div className="form-group">
              <input type="text" id="footer" name="footer" placeholder='Enter Footer' value={formData.footer} onChange={handleChange} />
          </div>
        </form>
    </div>)}
    </>
  )
}
export default ToggleHF