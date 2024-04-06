/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../../redux/features/book/bookApi";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import UpdateForm from "../../components/form/UpdateForm";
import { Button } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const UpdateProduct = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSingleBookQuery(bookId);
  console.log("from update", data?.data);
  const user = useAppSelector(selectCurrentUser);

  console.log(bookId);
  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }
  if (!isLoading && !isError && data?.data?._id) {
    content = <UpdateForm book={data?.data} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0">
      <div className="w-full">
        <div className="px-4 sm:px-0 pb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Update Books
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Please fillup the form to Update Books
          </p>
          <div className="">
            <Button
              type="primary"
              danger
              onClick={() => navigate(`/${(user as any)?.role}/view-books`)}
            >
              Back
            </Button>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{content}</div>
      </div>
    </div>
  );
};

export default UpdateProduct;
