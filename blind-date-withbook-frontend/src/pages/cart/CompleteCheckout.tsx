/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, Divider, Button, Spin, InputNumber } from "antd";
import {
  useGetCartSummaryQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "../../redux/features/cart/cartApi";

const CompleteCheckout = () => {
  const {
    data: cartSummary,
    isLoading: cartSummaryLoading,
    isError: cartSummaryError,
    error: cartSummaryErrorDetail,
    refetch: refetchCartSummary,
  } = useGetCartSummaryQuery({});

  const [removeFromCartMutation, { isLoading: removeLoading }] =
    useRemoveFromCartMutation();
  const [updateQuantityMutation] = useUpdateCartItemQuantityMutation();

  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async (bookId: string) => {
    setLoading(true);
    try {
      await removeFromCartMutation(bookId);
      await refetchCartSummary();
    } catch (error) {
      console.error("Error while removing item from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (bookId: string, quantity: number) => {
    setLoading(true);
    try {
      await updateQuantityMutation({
        bookId,
        quantity,
      });
      await refetchCartSummary();
    } catch (error) {
      console.error("Error while updating item quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  if (cartSummaryLoading || loading) {
    return <Spin size="large" />;
  }

  if (cartSummaryError && cartSummaryErrorDetail instanceof Error) {
    return <div>Error: {cartSummaryErrorDetail.message}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Complete Checkout
      </h1>
      <Card title="Cart Summary" className="mb-4">
        <p className="text-lg">
          Total Amount: ${cartSummary?.data.totalAmount.toFixed(2)}
        </p>
        <Divider />
        <p className="text-lg">Buyer's Name: {cartSummary?.data.buyerName}</p>
        <p className="text-lg">
          Contact Number: {cartSummary?.data.contactNumber}
        </p>
        <p className="text-lg">
          Selling Date:{" "}
          {new Date(cartSummary?.data.sellingDate).toLocaleString()}
        </p>
        <Divider />
        <p className="text-lg">Items:</p>
        <ul>
          {cartSummary?.data.items.map((item: any, index: number) => (
            <li key={index} className="mb-4">
              <p className="text-lg">
                Book ID: {item.book}, Quantity: {item.quantity}
              </p>
              <div className="flex items-center mt-2">
                <Button
                  onClick={() => handleRemoveFromCart(item.book)}
                  loading={removeLoading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold mr-4"
                >
                  Remove
                </Button>
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) =>
                    handleUpdateQuantity(item.book, Number(value))
                  }
                  className="w-32"
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CompleteCheckout;
