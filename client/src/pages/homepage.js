import React from "react";
import Header from "../components/Headers/Header";
import Post from "../components/Posts/Post";
import { useEffect , useState } from "react";

function HomePage(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/create').then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            });
        })
    },[]);
    return(
        <main>
            <Header/>
            {posts.length > 0 && posts.map(post=>(
                <Post {...post} />
            ))}
        </main>
    )
}

export default HomePage;