import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form"


function MyApp(){
    const[characters, setCharacters] = useState([]);

    function removeOneCharacter(id){
        //call fetch
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        })

        //wait for promise
        .then((res) => {
            if (res.status === 204) { //Check for successful delete
                //filter by id
                const updated = characters.filter((character) => character.id !== id);
                setCharacters(updated);
            } else if (res.status === 404){
                console.log("User not found.");
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function updateList(person){
        //Person will only have name and job
        postUser(person)
            .then((response) => {
                if (response.status === 201){
                    return response.json();
                } else {
                    console.log("User not created. Server returned:", response.status);
                }
            })
            //new user now has id so use instead of person
            .then((newUser) => setCharacters([...characters, newUser]))
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers(){
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        
        return promise;
    }

    useEffect(() => {
        fetchUsers()
                .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"]))
                .catch((error) => { console.log(error); });
    }, []);


    return(
        <div className="container">
            <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;
