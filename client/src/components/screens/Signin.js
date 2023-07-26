import React,{useState,useContext,} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Signin= ()=>{
    const{state,dispatch}=useContext(UserContext)
    const navigate = useNavigate()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/Signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-1"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signed in successfully", classes:"#4caf50 green"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard" class="back">
        <div className="card auth-card input-field input">
            
        <h2>FarmStar</h2>
        <input type="text" 
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
       />
       <input type="password" 
         placeholder="Password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        />
       <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action"
       onClick={()=>PostData()}
       >
        Signin
       </button>
       <p>
        <Link to="/Signup"><p style={{color:"black"}}>Don't have an account,Signup</p></Link>
       </p>
      </div>
        </div>

    )
}

export default Signin