'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React,{useState} from 'react';


const AddPost = () => {
  const [error,setError] = useState(null)
  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: async(values) => {
      const response = await fetch("/api/posts",{
        method:'POST',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify(values)
      });
      let res=await response.json();
      try{
        if(res.ok){
          formik.resetForm();
        }
      }
      catch(error){
        throw new Error(error.message) 
      }
      
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required")
    })
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Create New Post</h1>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
            <input 
              {...formik.getFieldProps('title')} 
              name="title" 
              id="title" 
              placeholder="Enter a title"
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${formik.touched.title && formik.errors.title ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea 
              {...formik.getFieldProps('description')} 
              name="description" 
              id="description" 
              placeholder="Enter a description"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none h-32
              ${formik.touched.description && formik.errors.description ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={!formik.isValid|| formik.isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            {formik.isSubmitting ? "Processing" : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;