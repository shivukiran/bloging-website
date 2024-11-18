import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign , verify} from 'hono/jwt'
import z from "zod";
import {signupInput , signinInput } from "@xtron/xtron-medium-common"

// const app = new Hono()

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL :string,
    jwt_secret:string,
    userId :string
  }
}>()


userRouter.post('/signup' , async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json();
   const {success} = signupInput.safeParse(body);

   if(!success)
   {
    c.status(411);
    return c.json({
      message:"Incorrect Input!"
    })
   }
  
    //get the user object 
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.jwt_secret);
  
      return c.text(jwt)
    } catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })
userRouter.post('/signin' ,async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
 
    if(!success)
    {
     c.status(411);
     return c.json({
       message:"Incorrect Input!"
     })
    }

    try{

    const user = await prisma.user.findUnique({
      where:{
        email :body.email,
        password : body.password
      }
    });
    
	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}
  console.log("Login successfull !!! ")
	const jwt = await sign({ id: user.id }, c.env.jwt_secret);
	return c.text(jwt)
  }
  catch(e){
    console.log(e)
    c.status(411)
    alert("Error Login while sigining")
    return c.text('Invalid');
  }
})
