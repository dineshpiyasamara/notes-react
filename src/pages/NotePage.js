import React, {useState, useEffect} from 'react';
// import notes from '../assets/notes';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/leftArrow.svg';

const NotePage = ({match, history}) => {
    let noteId = match.params.id;
    // let note = notes.find(note=>note.id==Number(noteId));

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    },[noteId])

    let getNote = async() =>{
        if (noteId=='new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () =>{
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({...note, 'updated':new Date()})
        })
    }

    let createNote = async () =>{
        await fetch(`http://localhost:8000/notes/`,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({...note, 'updated':new Date()})
        })
        history.push('/')
    }

    let DeleteNote = async () =>{
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'DELETE',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(note)
        })
        history.push('/')
    }

    
    let handleSubmit = () => {

        if (noteId !=='new'&& !note.body){
            DeleteNote()
        }
        else if(noteId!='new'){
            updateNote()
        }
        else if(noteId=='new' && note!=null){
            createNote()
        }

        history.push('/')
    }

    return (
        <div className="note">

            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit}></ArrowLeft>
                    </Link>
                </h3>

                {noteId !== 'new'?(
                    <button onClick={DeleteNote}>Delete</button>
                ):(
                    <button onClick={createNote}>Done</button>
                )}

            </div>

            <textarea value={note?.body} onChange={(e)=>{
                setNote({...note,'body':e.target.value})
            }}></textarea>

        </div>
    )
}

export default NotePage
