import React, {useState} from 'react'


const useToken = () => {
    const getToken =() =>{
        const tokenString = sessionStorage.getItem('UserData')
        const userToken = JSON.parse(tokenString)
        console.log("from here", userToken)
        return userToken
    } 

    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
        sessionStorage.setItem('UserData', JSON.stringify(userToken))
        setToken(userToken)
      }
      return {
        setToken: saveToken,
        token
      }
    }

export default useToken