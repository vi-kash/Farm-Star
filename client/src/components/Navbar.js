import React,{useContext,useRef,useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar=()=>{
  const searchModal= useRef(null)
  const [search,setSearch]=useState('')
  const [userDetails,setUserDeatails]=useState([])
  const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate()
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList=()=>{
    if(state){
     return [
      
      <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"white"}}>search</i></li>,
      <li key="2"><Link to="/profile">Profile</Link></li>,
      <li key="3"><Link to="/createPost">CreatePost</Link></li>,
      <li key="4"><Link to="/myfollowingpost">My Following Posts</Link></li>,
      <li key="5">
         <button className="btn waves-effect waves-light #f44336 red" type="submit" name="action"
       onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate('/Signin')
       }}
       >
        Logout
       </button>
      </li>
     ]
    }else{
        return [
          <li key="6"><Link to="/signin"><h5>Signin</h5></Link></li>,
          <li key="7"><Link to="/signup"><h5>Signup</h5></Link></li>
        ]
    }
  }

  const fetchUsers=(query)=>{
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
      }).then(res=>res.json)
      .then(results=>{
       setUserDeatails(results.user)
    })
  }
    return(
        <nav >
        <div className="nav-wrapper green darken-4">
          <Link to={state?"/":"/Signin"} 
          className="brand-logo left">
            FarmStar</Link>
          <ul id="nav-mobile" className="right"> 
            {renderList()}
          </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}} >
    <div className="modal-content">
    <input type="text" 
         placeholder="search users"
         value={search}
         onChange={(e)=>fetchUsers(e.target.value)}
       />
    <ul className="collection" style={{color:"black"}}> 
    {userDetails.map(item=>{
      return <li className="collection-item">{item.email}</li>
    })}
     
    </ul>
    </div>
    <div className="modal-footer">
      <button href="#modal_modal1" className="modal-close waves-effect waves-green btn-flat">Agree</button>
    </div>
  </div>
      </nav>
    )
}

export default NavBar