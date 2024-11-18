import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify } from 'hono/jwt'
import {createBlogInput , updateBlogInput } from "@xtron/xtron-medium-common"
// import {createBlogInput , updateBlogInput } from "../../../common/src/index"
// const app = new Hono()

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL :string,
    jwt_secret:string;
  },
  Variables:{
	userId:string;
  }
}>();




//before going into other routes u should go throught other routes and protect 
blogRouter.use('/*', async (c, next) => {
	const authHeader = c.req.header('Authorization')||"";
	if (!authHeader) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	// const token = authHeader;
	try{
	const payload = await verify(authHeader, c.env.jwt_secret);
	if (!payload|| typeof payload.id !=="string") {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

	//Here you are trying set AuthoId but context does not have it , so i have to explicitly define it in variable which is done above near bindings  , c has req , body , json
	//U can add @ts-ignore but it is a bad habbit
	else{
	c.set("userId", payload.id);
	console.log("Logged in")
	await next()
	}
}
catch(e)
{
	c.status(401);
	return c.json({
		message:"You are not logged In"
	})
}
})

blogRouter.post('/', async (c) => {
	
	const authorId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  

	  const body = await c.req.json()
	  const { success } = createBlogInput.safeParse(body);
	  if (!success) {
		  c.status(400);
		  return c.json({ error: "invalid input" });
	  }
	const blog =   await prisma.post.create({
		data:{
			title :body.title,
			content:body.content,
			authorId:authorId
			
		}
	  })
  return c.json({
	id: blog.id
  })

})
 
blogRouter.put('/' , async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  

	  const body = await c.req.json()
	  const { success } = updateBlogInput.safeParse(body);
	  if (!success) {
		  c.status(400);
		  return c.json({ error: "invalid input" });
	  }
	const blog =   await prisma.post.update({
		where:{
				id:body.id
		},
		data:{
			title :body.title,
			content:body.content,
			published:body.published
			
		}
	  })
  return c.json({
	id: blog.id
  })
})

blogRouter.get('/bulk' , async(c)=>{

	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  
	  const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

  return c.json({
	blogs
  })
})

blogRouter.get('/:id' , async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  

	  const id = await c.req.param("id")

	  try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
	}
	  catch(e)
	  {
		c.status(411)
		return c.json({
			message:"error while fetching",
			error:e
		})
	  }

})



//add Pagination in future
