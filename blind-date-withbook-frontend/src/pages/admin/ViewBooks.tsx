import Spinner from '../../ui/Spinner';
import ViewBookCard from '../../components/card/ViewBookCard';
import { useGetBooksQuery } from '../../redux/features/book/bookApi';
import { useEffect } from 'react';

const ViewBooks = () => {
  const { data: books, isLoading, isError, refetch } = useGetBooksQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isLoading || !Array.isArray(books?.data)) {
    content = <Spinner />;
  }

  if (!isLoading && !isError && books?.data) {
    content = <ViewBookCard books={books.data} />;
  }

  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {content}
      </div>
    </div>
  );
};

export default ViewBooks;
