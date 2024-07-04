import React from 'react'

function Chat(socket,username,room,lecturer) {
    const [currentMessage,setCurrentMessage]=useState("");
    const sendMessage= async()=>{
        if(currentMessage!==""){
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
                time:
                new Date(Date.now()).getHours()+
                ":"+
                new Date(Date.now()).getMintues(),
            };
            await socket.emit("send_message",messageData);
        }
    }
  return (
    <div>
      <div className="chat-header"></div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" 
        placeholder="hey"
        onChange={(event)=>{
            setCurrentMessage(event.target.value);
        }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
