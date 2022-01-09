import React,{useState,useEffect}from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './chat.css'

const Chat = ({socket,name,room,msg}) => {
    const [message,setMessage]=useState()
    const[messageList,setMessageList]=useState([msg])
    const[adminMessage,setAdminMessage]=useState([])

 
    const sendmsg=async()=>{
        if(message!==""){
            const messageData={
                room,sender:name,message,time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            }

            await socket.emit("sendMessage",messageData)
            setMessageList((list)=>[...list,messageData]);
            setMessage("")
        }
    }

     useEffect(() => {
        socket.on('message',(data)=>{setMessageList((list)=>[...list,data])
        console.log(adminMessage)})
         socket.on('receiveMmessage',(data)=>{
          setMessageList((list)=>[...list,data]);
        })
    }, [socket])


    return (
        <div className='chat-container'>
                 <div className="chat-body">
                <div className="messages-body">
                    <div className="messages">
                        <ScrollToBottom className="message-container">
                            {/*adminMessage.map((message)=>{
                                return(<div className='message-admin'>
                                    {message.text}
                                </div>)
                            })*/}
                        {messageList.map((message)=>{
                            return( 
                                <div className='fixer'>
                                <div className='message'>
                                     <div id={name===message.sender?'you':message.sender==='admin'?'admin':'other'}>
                                   {message.sender!=='admin'?<p className='message-meta' id='sender' >{message.sender}</p> :null}
                                  <div className={message.sender==='admin'?'message-admin':'message-content'}>
                                  <p>{message.message}</p>
                                </div>
                               <div className="message-meta">
                                   {message.sender!=='admin'?<p>{`sent at ${message.time}`}</p>:null}
                               </div>
                               </div>
                                </div>
                                </div>
                               )

                        })}
                        </ScrollToBottom>
                    </div>
                   <div className="send-box">
                       <input className='send-input' type="text" placeholder="say hi" value={message} onChange={(event)=>{setMessage(event.target.value)}} onKeyPress={(event)=>event.key==='Enter'? sendmsg(event):null}/>
                       <button  className='send-btn' onClick={sendmsg}>Send</button>
                    </div> 
                </div>
            </div>
             
        </div>
    )
}

export default Chat
