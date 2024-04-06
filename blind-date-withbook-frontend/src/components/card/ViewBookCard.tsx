import { Book } from "../../types/bookTypes";
import { Link } from "react-router-dom";
import { Card } from "antd";
import SalesManagement from "../../pages/admin/SalesManagement";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToCart } from "../../redux/features/cart/cartSlice";
import CommonButton from "../../ui/Button";

interface ViewBookCardProps {
  books: Book[];
}

const ViewBookCard = ({ books }: ViewBookCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCartHandler = (bookId: string) => {
    dispatch(addToCart(bookId));
  };

  console.log(cartItems);

  return (
    <>
      {books.map((book) => (
        <div key={book._id} className="mb-4">
          <Card
            title={book.name}
            className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto"
          >
            <img
              src={book.img}
              alt={book.name}
              className="w-full h-40 object-cover mb-2"
            />
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">Price: ${book.price.toFixed(2)}</p>
            <p className="text-sm">Quantity: {book.quantity}</p>
            <p className="text-sm">Release Date: {book.releaseDate}</p>
            <p className="text-sm">ISBN: {book.isbn}</p>
            <p className="text-sm">Publisher: {book.publisher}</p>
            <p className="text-sm">Page Count: {book.pageCount}</p>

            <div className="flex space-x-2 mt-4">
              <Link to={`/book/${book._id}`}>
                <CommonButton>Update</CommonButton>
              </Link>

              <CommonButton
                onClick={() => addToCartHandler(book._id)}
                disabled={cartItems.some((item) => item.bookId === book._id)}
              >
                Add to Cart
              </CommonButton>

              <SalesManagement
                key={book._id}
                product={book}
                onFinish={() => {
                  console.log("Sale finished for book:", book.name);
                }}
              />
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ViewBookCard;
