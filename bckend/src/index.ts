import { initServer } from "./app";
import * as dotenv from "dotenv"
dotenv.config();
console.log(process.env);
const PORT=8000;
async function init(){
  const app=await initServer();

  app.listen(PORT,()=>console.log(`server started at PORT: ${PORT}`));
}
init();