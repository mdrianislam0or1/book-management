/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import  { useState, useEffect } from 'react';
import {
  useGetDailySalesQuery,
  useGetMonthlySalesQuery,
  useGetWeeklySalesQuery,
  useGetYearlySalesQuery,
} from '../../redux/features/sales/salesApi';
import { Button, Table } from 'antd';

const SalesHistory = () => {
  const [selectedTab, setSelectedTab] = useState<string>('weekly');

  const { data: weeklySales, refetch: refetchWeeklySales } = useGetWeeklySalesQuery({});
  const { data: dailySales, refetch: refetchDailySales } = useGetDailySalesQuery({});
  const { data: monthlySales, refetch: refetchMonthlySales } = useGetMonthlySalesQuery({});
  const { data: yearlySales, refetch: refetchYearlySales } = useGetYearlySalesQuery({});

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    switch (selectedTab) {
      case 'daily':
        refetchDailySales();
        break;
      case 'monthly':
        refetchMonthlySales();
        break;
      case 'yearly':
        refetchYearlySales();
        break;
      default:
        refetchWeeklySales();
        break;
    }
  }, [selectedTab, refetchDailySales, refetchWeeklySales, refetchMonthlySales, refetchYearlySales]);

  const renderColumns = () => [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Buyer',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => handleTabClick('weekly')}>Weekly</Button>
        <Button onClick={() => handleTabClick('daily')}>Daily</Button>
        <Button onClick={() => handleTabClick('monthly')}>Monthly</Button>
        <Button onClick={() => handleTabClick('yearly')}>Yearly</Button>
      </div>

      <h2 className="text-2xl mb-4">
        {selectedTab === 'weekly'
          ? 'Weekly'
          : selectedTab === 'daily'
          ? 'Daily'
          : selectedTab === 'monthly'
          ? 'Monthly'
          : 'Yearly'}{' '}
        Sales
      </h2>

      {selectedTab === 'weekly' && <Table dataSource={weeklySales?.data || []} columns={renderColumns()} />}
      {selectedTab === 'daily' && <Table dataSource={dailySales?.data || []} columns={renderColumns()} />}
      {selectedTab === 'monthly' && <Table dataSource={monthlySales?.data || []} columns={renderColumns()} />}
      {selectedTab === 'yearly' && <Table dataSource={yearlySales?.data || []} columns={renderColumns()} />}
    </div>
  );
};

export default SalesHistory;
