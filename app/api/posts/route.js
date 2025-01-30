import Post from '@/models/Post'
import connectDB from '@/utils/connectDB'
import { NextResponse } from 'next/server'


// Get all posts


// Create a post

export async function POST(request){
  await connectDB();
  const data = await request.json();
 try {
  const post = await Post.create(data);
  return new NextResponse(JSON.stringify({post}))
 } catch (error) {
  return new NextResponse(JSON.stringify({
    message:error.message
  }))
 }
};

export async function GET(){
  await connectDB()
  try {
    const data = await Post.find({});
    return new NextResponse(JSON.stringify({data}))
  } catch (error) {
    return new NextResponse(JSON.stringify({message:error.message}))
  }
}