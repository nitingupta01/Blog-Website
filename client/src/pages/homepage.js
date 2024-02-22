import React from "react";
import Header from "../components/Headers/Header";
import Post from "../components/Posts/Post";
import { useEffect , useState } from "react";
import {BallTriangle} from "react-loader-spinner";
import {URL} from '../constants/constant';

function HomePage(){
    const [posts,setPosts] = useState([]);
    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetch(`${URL}/create`).then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
                setIsLoading(false);
            }).catch(err=>{
                
            });
        }).catch(err=>{
            
        })
    },[]);
    return(
        <main>
            <Header/>
            {isLoading && <div className="loading-box">
                <BallTriangle
                    height={150}
                    width={150}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    />
            </div>}
            {posts.length > 0 && posts.map(post=>(
            <Post {...post} />
            ))}
            
        </main>
    )
}

export default HomePage;