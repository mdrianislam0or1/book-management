import CommonButton from '../../ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table';
import { useGetBooksQuery } from '../../redux/features/book/bookApi';
import { Book } from '../../types/bookTypes';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data: books = {}, isLoading, isError } = useGetBooksQuery({});

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Books</h1>
        
          <div className='px-2'>
          <Link to="/admin/create-books">
          <CommonButton variant='danger'>Add book</CommonButton>

          </Link>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Author</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell >Loading...</TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell >Error fetching data</TableCell>
                </TableRow>
              ) : (
                books.data.map((book: Book) => (
                  <TableRow key={book._id}>
                    <TableCell>
                      <img
                        alt="Book image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={book.img || '/placeholder.svg'}
                        width="64"
                      />
                    </TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{`${book.quantity} in stock`}</TableCell>
                    <TableCell>{book.author}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
