/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker } from "antd";
import { useAddBookMutation } from "../../redux/features/book/bookApi";
import Spinner from "../../ui/Spinner";
import moment from "moment";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const EditBookForm = () => {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const user = useAppSelector(selectCurrentUser);

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=1649fb6f862db7406016a17722160f94",
        formData
      );

      const result = response.data;
      setImgUrl(result.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const initialValues = {
    name: "Harry Potter",
    author: "J.K. Rowling",
    price: "10",
    quantity: "10",
    releaseDate: moment("1997-06-26"),
    isbn: "9780747532743",
    genre: "Fantasy",
    publisher: "Bloomsbury Publishing",
    series: "Harry Potter",
    language: "English",
    format: "Hardcover",
    pageCount: 223,
    img: "",
  };

  const onFinish = async (values: any) => {
    try {
      values.price = Number(values.price);
      values.quantity = Number(values.quantity);
      values.img = imgUrl;

      const response = await addBook(values);
      console.log("POST Response:", response);
      toast.success("New book created successfully");
      navigate(`/${(user as any)?.role}/view-books`);
    } catch (error) {
      console.error("Error updating/adding book:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto container">
      <div className="form-container">
        <h1 className="text-2xl font-semibold mb-2 text-center">Edit Book</h1>
        <hr />
        <br />
        <br />
        <br />
        <div className="">
          <Button
            type="primary"
            danger
            onClick={() => navigate(`/${(user as any)?.role}/view-books`)}
          >
            Back
          </Button>
        </div>
        <Form
          name="editBookForm"
          onFinish={onFinish}
          initialValues={initialValues}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Book Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Img Upload" name="img">
            <input
              type="file"
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
          </Form.Item>

          <Form.Item label="Author" name="author">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Release Date" name="releaseDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="ISBN" name="isbn">
            <Input />
          </Form.Item>

          <Form.Item label="Genre" name="genre">
            <Input />
          </Form.Item>

          <Form.Item label="Publisher" name="publisher">
            <Input />
          </Form.Item>

          <Form.Item label="Series" name="series">
            <Input />
          </Form.Item>

          <Form.Item label="Language" name="language">
            <Input />
          </Form.Item>

          <Form.Item label="Format" name="format">
            <Input />
          </Form.Item>

          <Form.Item label="Page Count" name="pageCount">
            <Input type="number" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" danger htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBookForm;
