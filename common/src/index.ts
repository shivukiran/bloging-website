import z from "zod";

export const signupInput  = z.object({
    email :z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  })

  //type inference


export const signinInput  = z.object({
    email :z.string().email(),
    password:z.string().min(6),
  })

  //type inference

export const createBlogInput  = z.object({
    title :z.string(),
    content:z.string()
  })

  //type inference

export const updateBlogInput  = z.object({
    title :z.string(),
    content:z.string(),
    id:z.string()
  })

  //type inference
  export type signupInput = z.infer<typeof signupInput>
  export type signinInput = z.infer<typeof signinInput>
  export type createBlogInput = z.infer<typeof createBlogInput>
  export type updateBlogInput = z.infer<typeof updateBlogInput>


