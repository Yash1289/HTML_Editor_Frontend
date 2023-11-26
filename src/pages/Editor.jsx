import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { saveAs } from 'file-saver';
import "./Editor.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import LoadingOverlay from 'react-loading-overlay-ts';
import AppPicker from "../component/filePicker";


const override = {
  margin: "0 auto",
  borderColor: "red",
};
 
export default function Editor() {
  
  const editor = useRef(null);
  const fileInputRef = useRef();
  const [content, setContent] = useState(``);
  const [isActive, setActive] = useState(false)

  const updateFileState = (newFile) => {
    setContent(newFile)
  }

  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const htmlString = e.target.result;
      setContent(htmlString);
    };

    reader.readAsText(file);
  };

  const saveHtmlFile = async () => {
    // Create a Blob containing the HTML content
    setActive(true)
    const blob = new Blob([content], { type: 'text/html' });

    // saveAs(blob, 'edited.html');

    // Convert the Blob to a FormData object to send it in a POST request
    const formData = new FormData();
    formData.append('htmlFile', blob, 'edited.html');

    // Send a POST request to your server
    let response_h = await fetch('https://html-editor-server-backend.onrender.com/html-upload', {
        method: 'POST',
        body: formData,
    }) 
    // let res = await response_h.json(); 
    if (response_h.status == 201) {

      let downloadResponse = await fetch('https://html-editor-server-backend.onrender.com/download', {
                method: 'GET',
            });

      if (downloadResponse.ok) {

      saveAs(blob, 'edited.pdf');
      }

      setActive(false)
      setContent('')
      }
    else {
        console.log(response_h)
        alert("Error sending HTML file to the server.");
      }
    
};

  const config = {
    readonly: false,
    controls: {
      classSpan: { 
        list: {
          boldText: 'boldText'
        }
      }
    },
    width: '100vw' ,
    height : '95vh',
    buttons: ["bold","italic","underline","|","ul","ol","|","align","|","image","link","table","|","fontsize","font","brush","|","undo","redo","|","subscript","superscript","|","eraser","copyformat", "classSpan"],
    buttonsMD: 'bold,italic,underline,|,ul,ol,|,align,|,image,link,table,|,fontsize,font,brush,|,undo,redo,|,subscript,superscript,|,eraser,copyformat,classSpan',
    toolbarButtonSize: 'large',
    theme : 'summer',
    placeholder : 'Upload a HTML File to get started..'
  };

  return (
    <div className="App">
        <LoadingOverlay
        active={isActive}
        spinner={<PropagateLoader size={15} color="#ff7377"/>}
        >
        <div>
          <div className="content-container">
            <AppPicker updateFileState = {updateFileState}/>
            <input
              type="file"
              accept=".html"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={saveHtmlFile} className="save-button">
              Save HTML
            </button>
          </div>
          
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>
        </LoadingOverlay>
    </div>
  );
}
