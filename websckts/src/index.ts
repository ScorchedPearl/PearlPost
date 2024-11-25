import { WebSocketServer,WebSocket } from "ws";
const wss=new WebSocketServer({port:8080});
interface User{
  socket:WebSocket;
  room:string;
  imageURL?:string;
}
let allSockets:User[]=[];
wss.on("connection",function(socket){
  socket.on("message",(event)=>{
    const parsedMessage=JSON.parse(event as unknown as string);
    if(parsedMessage.type==="join"){
      console.log("UserJoinedRoom"+parsedMessage.payload.room);
      allSockets.push({
        socket,
        room:parsedMessage.payload.room,
        imageURL:parsedMessage.payload.imageURL?parsedMessage.payload.imageURL:"",
      })
    }
    if(parsedMessage.type==="message"){
      console.log("Chat");
      allSockets.forEach((user)=>{
        if(user.room===parsedMessage.payload.room){
          user.socket.send(event.toString());
        }
      })
    }
    // if(parsedMessage.type==="leave"){
    //   allSockets=allSockets.filter((user)=>{
    //     return user.id!==parsedMessage.payload.id
    //   })
    // }
    socket.on("disconnect",()=>{
  
    })
  }
)}
)