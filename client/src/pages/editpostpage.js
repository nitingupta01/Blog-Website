import React from "react";
import Header from "../components/Headers/Header";
import { useState , useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { URL } from "../constants/constant";



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


function EditPostPage(){
    const {id}=useParams();

    const [title , setTitle] = useState('');
    const [summary , setSummary] = useState('');
    const [content , setContent] = useState('');
    const [files , setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        fetch(`${URL}/post/${id}`).then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);

            })
        })
    },[]);

    async function editPost(e){
        e.preventDefault();
        const data = new FormData;
        data.set('id',id);
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);

        if(files?.[0]){
            data.set('file',files?.[0]);
        }

        const response = await fetch(`${URL}/post`,{
            method:'PUT',
            body:data,
            credentials:'include',
        });
        
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to = {'/post/'+id} />
    }
    return(
        <main>
            <Header/>
            <form onSubmit={editPost}>
                <input type="title" placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="summary" placeholder='Summary' value={summary} onChange={(e)=>{setSummary(e.target.value)}}/>
                <input type="file" onChange={(e)=>{setFiles(e.target.files)}} />
                <ReactQuill placeholder="Enter blog here" value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)}/>
                <button style={{marginTop:'5px'}}>Update Post</button>
            </form>
        </main>
    );
}

export default EditPostPage;