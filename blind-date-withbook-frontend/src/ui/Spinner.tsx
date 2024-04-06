
const Spinner = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="animate-pulse">
        <div className="rounded-full h-12 w-12 border-4 border-indigo-500 border-t-indigo-700 border-b-0 border-r-0 border-l-0"></div>
      </div>
    </div>
  );
};

export default Spinner;
