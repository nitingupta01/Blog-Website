import React from "react";
import Header from "../components/Headers/Header";
import { Link, useParams } from "react-router-dom";
import { useState , useEffect ,useContext } from "react";
import {formatISO9075} from "date-fns";
import { UserContext } from "../Usercontext";
import { BiEdit } from 'react-icons/bi';


function PostPage(){
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const [postInfo , setPostInfo] = useState(null);
    useEffect(()=>{
        // console.log(id);
        fetch(`https://blog-website-j3d6.onrender.com/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    },[]);

    if(!postInfo) return '';
    return(
        <main>
            <Header/>
            <div className="post-page">
                <h1>{postInfo.title}</h1>
                <div className="time">{formatISO9075(new Date(postInfo.createdAt))}</div>
                <div className="author">by @ {postInfo.author.username}</div>
                {
                    userInfo.id===postInfo.author._id && (
                        <div className="edit-row">
                            <Link className="edit-link" to={`/edit/${postInfo._id}`}><BiEdit/>Edit Post</Link>
                        </div>
                    ) 
                }
                <div className="image">
                    <img src={`https://blog-website-j3d6.onrender.com/${postInfo.cover}`}></img>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
            </div>
        </main>
    );
}

export default PostPage;