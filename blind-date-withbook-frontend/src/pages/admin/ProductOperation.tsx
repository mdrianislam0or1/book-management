import { useState } from "react";
import { Button, Popconfirm, Checkbox } from "antd";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useDeleteBooksMutation,
} from "../../redux/features/book/bookApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProductOperation = () => {
  const { data: books, isLoading, isError, refetch } = useGetBooksQuery({});
  const [deleteBookMutation] = useDeleteBookMutation();
  const [deleteBooksMutation] = useDeleteBooksMutation();

  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  console.log("books:", books?.data);

  const allBooks = books?.data || [];

  const handleDeleteBook = async (bookId: string) => {
    try {
      const response = await deleteBookMutation(bookId);
      if (response) {
        toast.success("Book deleted successfully");
        refetch();
      } else {
        toast.error("Error deleting book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    }
  };

  const handleBulkDelete = async () => {
    try {
      console.log("Selected Books:", selectedBooks);

      const response = await deleteBooksMutation(selectedBooks);
      console.log("Delete Response:", response);

      if (response) {
        toast.success("Selected books deleted successfully");
        refetch();
        setSelectedBooks([]);
      } else {
        toast.error("Error deleting books");
      }
    } catch (error) {
      console.error("Error deleting books:", error);
      toast.error("Error deleting books");
    }
  };

  const toggleBookSelection = (bookId: string) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };

  if (isLoading) {
    return toast.loading("Loading books");
  }

  if (isError || !Array.isArray(allBooks)) {
    return toast.error("Error loading books");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      <div className="mb-4">
        <Button
          type="primary"
          danger
          onClick={handleBulkDelete}
          disabled={selectedBooks.length === 0}
        >
          Bulk Delete Selected
        </Button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Image</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Author</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((book) => (
            <tr key={book._id}>
              <td className="py-2 px-4 border-b">
                <Checkbox
                  onChange={() => toggleBookSelection(book._id)}
                  checked={selectedBooks.includes(book._id)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <img src={book.img} className="h-10 w-10 object-cover" />
              </td>
              <td className="py-2 px-4 border-b">{book.name}</td>
              <td className="py-2 px-4 border-b">{book.author}</td>
              <td className="py-2 px-4 border-b">{book.price}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/book/${book._id}`}>
                  <Button type="text" danger>
                    Update
                  </Button>
                </Link>
                <Popconfirm
                  title="Are you sure to delete this book?"
                  onConfirm={() => handleDeleteBook(book._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductOperation;
