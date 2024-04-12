import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Input } from "antd";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../redux/features/cart/cartApi";
import { RootState } from "../../redux/store";
import {
  updateCartItemQuantity,
  removeFromCart,
  addToCart,
} from "../../redux/features/cart/cartSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [buyerName, setBuyerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [sellingDate, setSellingDate] = useState("");

  const [addToCartMutation, { isLoading: isAddingToCart }] =
    useAddToCartMutation();
  const [removeFromCartMutation, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const handleCheckout = () => {
    const requestBody = {
      bookItems: cartItems.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
      })),
      buyerName,
      contactNumber,
      sellingDate,
    };

    addToCartMutation(requestBody);
  };

  const handleQuantityChange = (bookId: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ bookId, quantity }));
  };

  const handleRemoveFromCart = async (bookId: string) => {
    dispatch(removeFromCart(bookId));

    try {
      await removeFromCartMutation(bookId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      dispatch(addToCart(bookId));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Checkout
      </h1>
      {cartItems.map((item) => (
        <Card key={item.bookId} className="mb-4 bg-gray-100 p-4">
          <p className="text-lg font-semibold mb-2">Book ID: {item.bookId}</p>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.bookId, +e.target.value)}
            className="mb-2"
            placeholder="Enter Quantity"
          />
          <Button
            onClick={() => handleRemoveFromCart(item.bookId)}
            loading={isRemovingFromCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Remove
          </Button>
        </Card>
      ))}
      <Input
        placeholder="Buyer's Name"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Selling Date"
        value={sellingDate}
        onChange={(e) => setSellingDate(e.target.value)}
        className="mb-8"
      />
      <Button
        type="primary"
        onClick={handleCheckout}
        loading={isAddingToCart}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutPage;
