import ReactPaginate from "react-paginate";

export function Paginate({ page, onChange, totalPage }){
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={page => onChange(page.selected)}
      pageRangeDisplayed={5}
      // initialPage={page}
      pageCount={totalPage || 1}
      className="paging"
      activeClassName="paging-item active"
      pageClassName="paging-item"
      previousClassName="feather-chevron-left"
      nextClassName="feather-chevron-right"
      previousLabel=""
      //@ts-ignore
      nextLabel=""
      renderOnZeroPageCount={null}
    />
  )
}