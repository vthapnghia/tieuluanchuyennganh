import ReactPaginate from "react-paginate";
import Icons from "../Icons";
import "./Pagination.scss";

function Pagination(props) {
  const { page, count, pageNumber, handlePageClick, handleChangePageNumber } =
    props;
  const numberOfPage = (count, pageNumber) => {
    let mod = count % pageNumber;
    let numOfPage = (count - mod) / pageNumber;
    if (mod === 0) {
      return numOfPage;
    }
    return numOfPage + 1;
  };

  return (
    <div className="paging">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Icons.AnglesRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageNumber}
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
      <select
        className="page-number"
        name="page-number"
        id="page-number"
        onChange={(e) => handleChangePageNumber(e.target.value)}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
  );
}

export default Pagination;
