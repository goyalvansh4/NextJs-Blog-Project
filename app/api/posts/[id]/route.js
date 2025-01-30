import Post from '@/models/Post'
import connectDB from '@/utils/connectDB'
import { NextResponse } from 'next/server'


// get a particular post
export async function GET(req,{params}){
  const p = await params;
  const {id}=p;
  await connectDB();
  
  try {
    const data = await Post.findById(id);
    return new NextResponse(JSON.stringify({data}))
  } catch (error) {
    return new NextResponse(JSON.stringify({message:error.message}))
  }
}

// update a post
export async function PUT(request,{params}){
  const p=await params;
  const {id}=p;
  const data = await request.json();
  await connectDB()
  
  try {
    const post = await Post.findByIdAndUpdate(id,data);
    return new NextResponse(JSON.stringify(post))
  } catch (error) {
    return new NextResponse(JSON.stringify({message:error.message}))
  }
}



// delete a post
export async function DELETE(req,{params}){
  const p = await params;
  const {id}=p;
  await connectDB();
  try {
    const data = await Post.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify("Post deleted successfully"))
  } catch (error) {
    return new NextResponse(JSON.stringify({message:error.message}))
  }
}