import React, {useState} from "react";
import Table from "./Table";
import Form from "./Form"


function MyApp(){
    const[characters, setCharacter] = useState([]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacter(updated);
    }

    return(
        <div className="container">
            <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form/>
        </div>
    );
}

export default MyApp;
