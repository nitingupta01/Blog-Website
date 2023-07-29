import React, { useState } from "react";
import Header from "../components/Headers/Header";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

function CreatePostPage(){
    const [title , setTitle] = useState('');
    const [summary , setSummary] = useState('');
    const [content , setContent] = useState('');
    const [files , setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    async function createPost(e){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);

        e.preventDefault();
        const response = await fetch('http://localhost:4000/create',{
            method:'POST',
            body: data,
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }
        else{
            alert('Pls Enter fields properly');
        }
    }
    if(redirect){
        return <Navigate to = '/' />
    }
    return(
        <main>
            <Header/>
            <form onSubmit={createPost}>
                <input type="title" placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="summary" placeholder='Summary' value={summary} onChange={(e)=>{setSummary(e.target.value)}}/>
                <input type="file" onChange={(e)=>{setFiles(e.target.files)}} />
                <ReactQuill placeholder="Enter blog here" value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)}/>
                <button style={{marginTop:'5px'}}>Create Post</button>
            </form>
        </main>
    );
}

export default CreatePostPage;