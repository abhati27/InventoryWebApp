import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();

    const doLogin =()=>{
        if(username === 'admin@incedo.com' && password === 'admin@123'){
            navigate("/admin");
            return; 
        }
        async function login(){
            try{
                let token = window.btoa(username + ':' + password);
                const response 
                    = await axios.get('http://localhost:8282/auth/login',{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    });
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
                localStorage.setItem('isLoggedIn', true)
                processRole(response.data.user.role);    
            }
            catch(err){
                setErrorMsg('Invalid Credentials!!')
            }  
        }
        login();

    }

    const processRole =(role)=>{
        //console.log(role)
        
        switch(role){
            case 'EXECUTIVE':
                navigate('/executive')
                break;
            case 'SUPPLIER':
                navigate('/supplier')
                break; 
            default: 
                setErrorMsg('Access Forbidden')
                break;  
        }
    }
    return(
        <div>
            <h3>Login</h3>
            {errorMsg?errorMsg:''}
            <br />
            <label>Username: </label>
            <input type="text" value={username} onChange={(e)=>{
                setUsername(e.target.value)
                setErrorMsg('')
            }}/>
            <br /><br />
            <label>Password: </label>
            <input type="text" value={password} onChange={(e)=>{
                setPassword(e.target.value)
                setErrorMsg('')
            }}/>
            <br /><br />
            <button onClick={()=>doLogin()}>LOGIN</button>
        </div>
        
        
    )
}
export default Login;