import facade from "../util/ApiFacade"
import { useState, useEffect } from "react"

function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")
       
    useEffect(() => { 
      facade.fetchData().then(data=> setDataFromServer(data.msg));

    }, [])
 
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{dataFromServer}</h3>
      </div>
    )
  }
 export default LoggedIn