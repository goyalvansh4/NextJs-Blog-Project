'use client';
import Link from 'next/link';
import { useParams,useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const PostDetails = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const routeId = params?.id;
  const router = useRouter();

  useEffect(() => {
    if (!routeId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${routeId}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result?.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [routeId]);


  const handleDelete=async()=>{
   const res = await fetch(`/api/posts/${routeId}`,{
    method:"DELETE",
    headers:{
      'content-Type':'application/json'
    },
   });
   console.log(await res.json());
   router.push("/posts");
  }

  if (error) return <p className="text-red-500">Failed to load post: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="w-[70%] mx-auto my-5 py-5 bg-gray-400 rounded-lg">
      <h1 className="text-xl font-bold text-black text-center">Post Details</h1>
      <div className="flex justify-between px-5">
      <div className="flex-col justify-center gap-2">
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Description:</strong> {data.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`edit/${routeId}`} >
          <MdEdit size={24} className='text-blue-500 text-lg'/>
        </Link>
        <button onClick={handleDelete}>
          <MdDelete size={24} className='text-red-500 text-lg'/>
        </button>
      </div>
      </div>
    </div>
  );
};

export default PostDetails;
