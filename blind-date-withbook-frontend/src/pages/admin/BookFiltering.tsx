/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DatePicker, Button, Table } from "antd";
import {
  useGetBooksQuery,
  useFilterBooksMutation,
} from "../../redux/features/book/bookApi";
import TextInput from "../../ui/TextInput";
import SalesManagement from "./SalesManagement";
import { Dayjs } from "dayjs";
import Spinner from "../../ui/Spinner";
import { toast } from "sonner";

const { RangePicker } = DatePicker;

interface BookFilters {
  priceRange: { min: number; max: number };
  releaseDate: {
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
  } | null;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  series: string;
  language: string;
  format: string;
  pageCount: number;
}

interface Book {
  _id: string;
}

interface FilteredData {
  success: boolean;
  statusCode: number;
  message: string;
  data: Book[];
}

const BookFiltering = () => {
  const [selectedProduct, setSelectedProduct] = useState<Book | null>(null);

  const [filters, setFilters] = useState<BookFilters>({
    priceRange: { min: 0, max: 100000 },
    releaseDate: null,
    author: "",
    isbn: "",
    genre: "",
    publisher: "",
    series: "",
    language: "",
    format: "",
    pageCount: 0,
  });

  const { isLoading, isError, refetch } = useGetBooksQuery({
    filters: filters as BookFilters,
  });

  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  const [filteredData, setFilteredData] = useState<FilteredData | null>(null);

  const [filterBooks] = useFilterBooksMutation();

  const handleFilterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await filterBooks(filters);

      if (response && "data" in response) {
        setFilteredData(response.data);
        refetch();
      } else {
        console.error("Filtered data is not in the expected format:", response);
      }
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  const columns = [
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Release Date", dataIndex: "releaseDate", key: "releaseDate" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    { title: "Genre", dataIndex: "genre", key: "genre" },
    { title: "Publisher", dataIndex: "publisher", key: "publisher" },
    { title: "Series", dataIndex: "series", key: "series" },
    { title: "Language", dataIndex: "language", key: "language" },
    { title: "Format", dataIndex: "format", key: "format" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Page Count", dataIndex: "pageCount", key: "pageCount" },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record: Book) => (
        <Button
          type="primary"
          danger
          onClick={() => handleSellButtonClick(record)}
        >
          Want to Sell?
        </Button>
      ),
    },
  ];

  const handleSellButtonClick = (record: Book) => {
    setSelectedProduct(record);
  };

  const handleModalClose = () => {
    // setIsModalOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Author"
                  value={filters.author}
                  onChange={(e) =>
                    setFilters({ ...filters, author: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <RangePicker
                  onChange={(dates) =>
                    setFilters({
                      ...filters,
                      releaseDate: dates
                        ? { startDate: dates[0], endDate: dates[1] }
                        : null,
                    })
                  }
                  placeholder={["Start Date", "End Date"]}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Min Price"
                  value={filters.priceRange.min.toString()}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: {
                        ...filters.priceRange,
                        min: parseInt(e.target.value),
                      },
                    })
                  }
                  type="number"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Max Price"
                  value={filters.priceRange.max.toString()}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: {
                        ...filters.priceRange,
                        max: parseInt(e.target.value),
                      },
                    })
                  }
                  type="number"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="ISBN"
                  value={filters.isbn}
                  onChange={(e) =>
                    setFilters({ ...filters, isbn: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Genre"
                  value={filters.genre}
                  onChange={(e) =>
                    setFilters({ ...filters, genre: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Publisher"
                  value={filters.publisher}
                  onChange={(e) =>
                    setFilters({ ...filters, publisher: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Series"
                  value={filters.series}
                  onChange={(e) =>
                    setFilters({ ...filters, series: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Language"
                  value={filters.language}
                  onChange={(e) =>
                    setFilters({ ...filters, language: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Format"
                  value={filters.format}
                  onChange={(e) =>
                    setFilters({ ...filters, format: e.target.value })
                  }
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Page Count"
                  value={filters.pageCount.toString()}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      pageCount: parseInt(e.target.value),
                    })
                  }
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button type="text" danger htmlType="submit">
            Apply Filters
          </Button>
        </div>
      </form>
      {isLoading && <Spinner />}
      {isError && toast.error("Error fetching books")}
      {filteredData && filteredData.data ? (
        <Table
          dataSource={filteredData.data}
          columns={[
            ...columns,
            {
              title: "Confirm Sale",
              dataIndex: "",
              key: "sales",
              render: () =>
                selectedProduct ? (
                  <SalesManagement
                    product={selectedProduct}
                    onFinish={handleModalClose}
                  />
                ) : null,
            },
          ]}
          pagination={false}
          rowKey={(record) => record._id}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BookFiltering;
