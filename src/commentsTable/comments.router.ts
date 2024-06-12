import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {commentval} from "../validator"
import{commentsservices,getcommentsservices,createcommets,updatecomments,deletecomments}from './comments.controller'
import { deletecomment } from './comments.service'
export const comment = new Hono()

comment.get("/comment",commentsservices)

comment.get("comment/:id",getcommentsservices)

comment.post("commentinsert",zValidator("json",commentval,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createcommets)

comment.put("/comment/:id",updatecomments)

comment.delete("/comment/:id",deletecomments)