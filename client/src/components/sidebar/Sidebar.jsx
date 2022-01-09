import React,{useState,useEffect} from 'react'
import './sidebar.css'
const Sidebar = ({users,room}) => {
    console.log(users)
    return (
        <div className='chat-sider'>
           <div className="current">
               <p className='side-text'>Active room</p>
               <p className='result'>{room}</p>
           </div>
           <div className="current">
               <p className='side-text'>Current users</p>
                     <div className='result'> {users.map((user)=><p>{user}</p>)}</div> 
                
           </div>
        </div>
    )
}

export default Sidebar
