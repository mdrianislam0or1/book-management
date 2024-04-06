/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../../redux/features/book/bookApi";
import { useEffect, useState } from "react";
import TextInput from "../../ui/TextInput";
import { toast } from "sonner";
import Success from "../../ui/Success";
import Error from "../../ui/Error";
import { BookType } from "../../types/bookTypes";
import axios from "axios";
import CommonButton from "../../ui/Button";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const UpdateForm = ({ book }: { book: BookType }) => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: singleBookData } = useGetSingleBookQuery(bookId);
  const [data, { isLoading, isError, isSuccess }] = useUpdateBookMutation();
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();

  useEffect(() => {}, [singleBookData]);

  console.log("singleBookData update", singleBookData);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              key: "1649fb6f862db7406016a17722160f94",
            },
          }
        );

        const imageUrl = response.data.data.url;
        setImg(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const {
    name: initialName,
    price: initialPrice,
    quantity: initialQuantity,
    releaseDate: initialReleaseDate,
    author: initialAuthor,
    isbn: initialIsbn,
    genre: initialGenre,
    publisher: initialPublisher,
    series: initialSeries,
    language: initialLanguage,
    format: initialFormat,
    pageCount: initialPageCount,
    img: initialImg,
  } = book;

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [releaseDate, setReleaseDate] = useState(initialReleaseDate);
  const [author, setAuthor] = useState(initialAuthor);
  const [isbn, setIsbn] = useState(initialIsbn);
  const [genre, setGenre] = useState(initialGenre);
  const [publisher, setPublisher] = useState(initialPublisher);
  const [series, setSeries] = useState(initialSeries);
  const [language, setLanguage] = useState(initialLanguage);
  const [format, setFormat] = useState(initialFormat);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [img, setImg] = useState(initialImg);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await data({
        bookId,
        bookData: {
          name,
          price,
          quantity,
          releaseDate,
          author,
          isbn,
          genre,
          publisher,
          series,
          language,
          format,
          pageCount,
          img,
        },
      });

      navigate(`/${(user as any)?.role}/view-books`);
      if ("error" in response) {
        console.error("Error updating product:", response.error);
      } else {
        console.log("Product updated:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Image"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  type={""}
                />
                <input type="file" onChange={handleImageChange} />
                <CommonButton
                  variant="primary"
                  type="button"
                  onClick={handleImageUpload}
                >
                  Upload Image
                </CommonButton>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Price"
                  value={price.toString()}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Release Date"
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title=" ISBN"
                  type=""
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Language"
                  type=""
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Series"
                  type=""
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Quantity"
                  value={quantity.toString()}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type={""}
                />
              </div>
              <div className="col-span-6">
                <TextInput
                  title="Page Count"
                  value={pageCount.toString()}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  type={""}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  type={""}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3  text-right sm:px-6">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {isSuccess && toast.success("Update successfull") && (
            <Success message="Product was updated successfully" />
          )}
          {isError && (
            <Error message="There was an error updating the product!" />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
