// import styles from "./styles.modules.css";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from './styles.module.css';

interface PaginationProps {
  pageRange?: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  pageRange = 1,
}) => {
  const paginationsVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      trantition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
  };

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  return (
    <motion.div
      variants={paginationsVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mx-2">...</span>}
        nextLabel={
          <span className={styles.arrow}>
            <LuChevronRight />
          </span>
        }
        pageRangeDisplayed={2}
        pageCount={pageRange}
        
        previousLabel={
          <span className={styles.arrow}>
            <LuChevronLeft />
          </span>
        }
        containerClassName="flex items-center justify-center mt-8 text-zinc-300"
        pageClassName={styles.page}
        renderOnZeroPageCount={null}
        activeClassName="bg-zinc-200 text-zinc-800"
        onPageChange={handlePageClick}
        forcePage={currentPage}
      />
    </motion.div>
  );
};
export default Pagination;
