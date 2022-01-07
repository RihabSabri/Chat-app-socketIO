import React,{useState,useEffect} from 'react'
import './sidebar.css'
const Sidebar = ({socket,name,room}) => {

     const [users,setUsers]=useState([])

    useEffect(() => {
        setUsers((users)=>[...users,name])
    }, [name])
   
    
   

    return (
        <div className='chat-sider'>
           <div className="current">
               <p className='side-text'>Active room</p>
               <p className='result'>{room}</p>
           </div>
           <div className="current">
               <p className='side-text'>Current users</p>
               {users.map((user)=>{
                    return( 
                    <div className='result'> <p>{user}</p></div>)
               })}
                           
           </div>
        </div>
    )
}

export default Sidebar
