"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";

const UpdatePost = () => {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState(null);
  // make http request
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [id]);
  //UseRouter
  const router = useRouter();
  const [submitErr, setSubmitErr] = useState(null);
  //formik config
  const formik = useFormik({
    initialValues: {
      description: data?.data?.description,
      title: data?.data?.title,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      //Make http request
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const result = await response.json();
        if (response.ok) {
          router.push("/posts");
        }
        if (!response.ok) {
          throw new Error(
            result.message || "An error occurred while creating the post"
          );
        }
        formik.resetForm();
        //Redirect
      } catch (error) {
        console.log(error?.message);
        setSubmitErr(error);
      }
    },
    // validationSchema: Yup.object({
    //   description: Yup.string().required("Description is required"),
    //   title: Yup.string().required("Title is required"),
    // }),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Update Post</h1>
        {submitErr && <div className="text-red-500">{submitErr.message}</div>}
        <p className="text-gray-500">Create your dream post</p>
        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          <div>
            <input
              className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Enter Title"
              name="title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>
          <div>
            <textarea
              className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Enter description here..."
              name="description"
              {...formik.getFieldProps("description")}
              rows="5"
              maxLength="5000"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {formik.isSubmitting ? "Processing..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;