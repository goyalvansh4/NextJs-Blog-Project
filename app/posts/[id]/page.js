'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const PostDetails = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const routeId = params?.id;

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

  if (error) return <p className="text-red-500">Failed to load post: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Post Details</h1>
      <div>
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Description:</strong> {data.description}</p>
      </div>
    </div>
  );
};

export default PostDetails;
