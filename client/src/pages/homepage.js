import React from "react";
import Header from "../components/Headers/Header";
import Post from "../components/Posts/Post";
import { useEffect , useState } from "react";
import {Oval} from "react-loader-spinner";

function HomePage(){
    const [posts,setPosts] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setIsError]=useState(null);

    useEffect(()=>{
        setIsLoading(true);
        fetch('https://blog-website-j3d6.onrender.com/create').then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
                setIsLoading(false);
                setIsError(null);
            }).catch(err=>{
                setIsLoading(false);
                setIsError(err);
            });
        }).catch(err=>{
            setIsLoading(false);
            setIsError(err);
        })
    },[]);
    return(
        <main>
            <Header/>
            {isLoading && <div style={{display:"flex"}}><Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{margin:"auto"}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            /></div>}
            {error && <div style={{textAlign:"center"}}>Server Error</div>}
            {posts.length > 0 && posts.map(post=>(
                <Post {...post} />
            ))}
        </main>
    )
}

export default HomePage;