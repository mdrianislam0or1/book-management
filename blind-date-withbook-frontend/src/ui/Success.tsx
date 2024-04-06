const Success = ({ message }: { message: string }) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a.5.5 0 0 0-.708 0L10 9.293 5.652 4.945a.5.5 0 0 0-.708.708L9.293 10l-4.347 4.348a.5.500 0 0 0 .708.708L10 10.707l4.348 4.347a.5.500 0 0 0 .708-.708L10.707 10l4.347-4.348a.5.5 0 0 0 0-.708z" />
        </svg>
      </span>
    </div>
  );
};

export default Success;
