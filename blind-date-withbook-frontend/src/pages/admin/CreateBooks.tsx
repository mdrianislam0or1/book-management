/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetBookData } from "../../redux/features/book/bookSlice";
import { useAddBookMutation } from "../../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CommonButton from "../../ui/Button";
import Success from "../../ui/Success";
import Error from "../../ui/Error";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const CreateBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookData = useAppSelector((state) => state.book);
  const { register, handleSubmit } = useForm();
  const [imgUrl, setImgUrl] = useState("");
  const [addBook, { isError, isSuccess, isLoading }] = useAddBookMutation();

  const user = useAppSelector(selectCurrentUser);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=1649fb6f862db7406016a17722160f94",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setImgUrl(result.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...bookData,
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      pageCount: parseInt(data.pageCount),
      img: imgUrl,
    };

    try {
      await addBook(formattedData).unwrap();
      isLoading && <Spinner />;
      dispatch(resetBookData());
      navigate(`/${(user as any)?.role}/view-books`);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="mx-auto container mt-5 md:mt-0 md:col-span-2">
      <div className="px-4 sm:px-0 pb-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Books
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Please fillup the form to Create Books
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Book Name:
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="img"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Img Url:
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={handleImageUpload}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  {...register("quantity")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="releaseDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Release Date:
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  {...register("releaseDate")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="author"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  {...register("author")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="isbn"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  ISBN:
                </label>
                <input
                  type="text"
                  id="isbn"
                  {...register("isbn")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="genre"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Genre:
                </label>
                <input
                  type="text"
                  id="genre"
                  {...register("genre")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="publisher"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Publisher:
                </label>
                <input
                  type="text"
                  id="publisher"
                  {...register("publisher")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="series"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Series:
                </label>
                <input
                  type="text"
                  id="series"
                  {...register("series")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="language"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Language:
                </label>
                <input
                  type="text"
                  id="language"
                  {...register("language")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="format"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Format:
                </label>
                <input
                  type="text"
                  id="format"
                  {...register("format")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="pageCount"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Page Count:
                </label>
                <input
                  type="number"
                  id="pageCount"
                  {...register("pageCount")}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <CommonButton variant="danger" type="submit">
                Add Book
              </CommonButton>
            </div>
          </div>
        </div>
        {isSuccess && <Success message="Book created successfully" />}
        {isError && (
          <Error message="There was an error updating the product!" />
        )}
      </form>
    </div>
  );
};

export default CreateBooks;
