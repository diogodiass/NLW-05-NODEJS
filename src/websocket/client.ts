import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams{
   text: string;
   email: string;
}

io.on("connect", (socket) => {
   const connectionsService = new ConnectionsService(); 
   const usersServices = new UsersService(); 
   const messagesService = new MessagesService();

   socket.on("client_first_access", async (params) =>{
      const socket_id = socket.id;
      const {text, email} = params as IParams;
      let user_id = null;
      
      const userExistis = await usersServices.findByEmail(email);
      
      if(!userExistis){
         const user = await usersServices.create(email);

         await connectionsService.create({
            socket_id,
            user_id: user.id
         });
         user_id = user.id;
      }else {       
         user_id = userExistis.id; 

         const connection = await connectionsService.findByUserId(userExistis.id);
         if(!connection){
           await connectionsService.create({
            socket_id,
            user_id: userExistis.id,
         }); 
      } else{
         connection.socket_id = socket_id;
         await connectionsService.create(connection);
         }
      }

      await messagesService.create({
         text,
         user_id
      });
   });

});



