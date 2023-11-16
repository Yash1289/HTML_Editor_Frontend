import React, { useContext, useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import './filePicker.css';
import { tokenContext } from '../Context/tokenContext';
import useToken from './tokenHook';

function AppPicker(props) {

  const [openPicker,data, authResponse] = useDrivePicker();
  const {token} = useToken() 
  const { aToken, setAToken } = useContext(tokenContext);
  console.log(aToken)

  const handleOpenPicker = () => {
    openPicker({
      clientId: "888767537668-77co0ovkbl6kurh865l8lpfnpu6m4v5h.apps.googleusercontent.com",
      developerKey: "AIzaSyB3YJGp84vTQDUG0UwviMYGWbCXWXj_X2g",
      token: aToken,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      setIncludeFolders : true,
      setParentFolder : "1xZijUkVNA5wFPeV62y1AG1e7wD5vllKw",
      callbackFunction: (data) => {
        if (data.action === "cancel") { 
          console.log("User clicked cancel/close button");
        } else if (data.action === "picked") {
          const fileId = data.docs[0].id; // Assuming you selected only one file
          const accessToken = aToken; // Replace with your access token
  
          // Fetch the file content using the Google Drive API
          fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.text())
            .then((fileContent) => {
              // Handle the file content, e.g., set it in your component state
              props.updateFileState(fileContent);
              
            })
            .catch((error) => {
              console.error("Error fetching file content", error);
            });
        }
      },
    });
  } 

  useEffect(() => {
    // When the component mounts, update the parent's state with childData
    console.log(token, " hello from picker")
    const access_token = token?.access_token
    setAToken(access_token)
   
    // props.updateState(token);
  }, [token, props]);

  return (
      <button className="upload-button" onClick={handleOpenPicker}>Open Picker</button>
  );
}

export default AppPicker;
