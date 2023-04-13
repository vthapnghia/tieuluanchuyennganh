import ReactPaginate from "react-paginate";
import Icons from "../Icons";
import "./Pagination.scss"
import { useMemo } from "react";

function Pagination(props) {
  const { page, count, pageNumber, handlePageClick } = props;

  const numberOfPage = (count, pageNumber) => {
    let mod = count % pageNumber;
    let numOfPage = (count - mod) / pageNumber;
    if (mod === 0) {
      return numOfPage;
    }
    return numOfPage + 1;
  };
  
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<Icons.AnglesRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      previousLabel={<Icons.AnglesLeft />}
      pageCount={numberOfPage(count, pageNumber)}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      forcePage={page - 1}
    />
  );
}

export default Pagination;
