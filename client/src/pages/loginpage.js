import React, { useContext } from "react";
import Header from "../components/Headers/Header";
import { useState } from "react";
import './loginpage.css';
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import {URL} from '../constants/constant'



function LoginPage(){
    const [username , setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [redirect , setRedirect]= useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(e){
        e.preventDefault();
        const response = await fetch(`${URL}/login`,{
            method: 'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        });
        if (response.ok){
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }
        else{
            alert('Wrong credentials');
        }

    }
    if(redirect){
        return <Navigate to='/'/>
    }
    return(
        <main>
            <Header/>
            <form onSubmit={login} className='login'>
                <h1>Login</h1>
                <input type="text" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </main>
    )
}

export default LoginPage;