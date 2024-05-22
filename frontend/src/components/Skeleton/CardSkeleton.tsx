const CardSkeleton = () => {
  return (
    <div className="relative max-w-11/12 md:max-w-11/12 flex overflow-hidden rounded-md shadow-xl dark:bg-gray-800 animate-pulse">
      <figure className="w-1/3 h-full bg-gray-300 dark:bg-gray-700"></figure>
      <article className="flex justify-center items-center px-4 py-2 w-full bg-white">
        <div className="w-full p-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 mb-6"></div>
          <div className="flex items-center mt-6 justify-end px-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-16"></div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardSkeleton;
