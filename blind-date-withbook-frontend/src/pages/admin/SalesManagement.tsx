/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import { useSellProductMutation } from '../../redux/features/sales/salesApi';
import { useGetBooksQuery } from '../../redux/features/book/bookApi';
import CommonButton from '../../ui/Button';

const { RangePicker } = DatePicker;

const SalesManagement = ({ product, onFinish }: { product: any; onFinish: () => void }) => {
    const [form] = Form.useForm();
    const [sellProduct, { isLoading }] = useSellProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { refetch } = useGetBooksQuery({}); 
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const validateQuantity = (_: any, value: any) => {
      if (value > product?.quantity) {
        return Promise.reject('Quantity cannot exceed available stock');
      }
      return Promise.resolve();
    };
  
    const handleFinish = async (values: any) => {
      try {
        const saleDate = values.saleDate ? values.saleDate[0].format('YYYY-MM-DD') : null;
    
        await sellProduct({ productId: product?._id, ...values, saleDate });
        message.success('Product sold successfully');
        form.resetFields();
        setIsModalOpen(false);
        onFinish();
  
        refetch();
      } catch (error) {
        console.error('Error selling product:', error);
        message.error('Error selling product');
      }
    };

  return (
    <div>
      <CommonButton variant='secondary' onClick={showModal}>
        Sell
      </CommonButton>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Form form={form} onFinish={handleFinish}>
                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                      { required: true, message: 'Please enter quantity' },
                      { validator: validateQuantity },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    label="Buyer Name"
                    name="buyerName"
                    rules={[{ required: true, message: 'Please enter buyer name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Sale Date"
                    name="saleDate"
                    rules={[{ required: true, message: 'Please select sale date' }]}
                  >
                    <RangePicker />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" danger htmlType="submit" loading={isLoading}>
                      Sell
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button danger onClick={handleCancel} type="primary">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
