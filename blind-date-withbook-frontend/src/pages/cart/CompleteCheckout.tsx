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
      <h1 className="text-2xl font-bold mb-4">Complete Checkout</h1>
      <Card title="Cart Summary" className="mb-4">
        <p>Total Amount: ${cartSummary?.data.totalAmount.toFixed(2)}</p>
        <Divider />
        <p>Buyer's Name: {cartSummary?.data.buyerName}</p>
        <p>Contact Number: {cartSummary?.data.contactNumber}</p>
        <p>
          Selling Date:{" "}
          {new Date(cartSummary?.data.sellingDate).toLocaleString()}
        </p>
        <Divider />
        <p>Items:</p>
        <ul>
          {cartSummary?.data.items.map((item: any, index: number) => (
            <li key={index}>
              Book ID: {item.book}, Quantity: {item.quantity}
              <Button
                onClick={() => handleRemoveFromCart(item.book)}
                loading={removeLoading}
                style={{ marginRight: "8px" }}
              >
                Remove
              </Button>
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) =>
                  handleUpdateQuantity(item.book, Number(value))
                }
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CompleteCheckout;
