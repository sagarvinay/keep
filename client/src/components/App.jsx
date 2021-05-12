import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [receivedNotes, setReceivedNotes] = useState([]);

   function addNote(newNote) {
    fetch("http://localhost:4000/notes", {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => setReceivedNotes([...receivedNotes, json.data]))
      .catch((err) => console.log("Request Failed", err));
  }

  function deleteNote(id, noteIndex) {
    console.log(noteIndex, id);
    fetch("http://localhost:4000/notes/" + id, {
      method: "DELETE"
      })
      .then(setReceivedNotes(receivedNotes.filter((note)=> note._id !== id)))
      .catch(err => console.log(err))
    
  }

  useEffect(() => {
    fetch("http://localhost:4000/notes", {
        method: "GET",
        headers: {
        'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(json => setReceivedNotes(json.notes))
        .catch(err => console.log(err))
  },[]);
 


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {receivedNotes.map((noteItem, index) => {
        
      return (
        <Note
          key={index}
          noteIndex={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      );
    })}
      <Footer />
    </div>
  );
}

export default App;
