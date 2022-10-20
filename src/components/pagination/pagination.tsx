import React, {useContext, useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
import IssuesContext from '../../context/issuesRepo.context'

interface Props {
  itemsPerPage: number;
}

export const Pagination: React.FC<Props> = (props) => {
  const {itemsPerPage } = props;
  const {currentIssues, setCurrentIssues, issuesData, setItemsPerPage, setFilteredIssues} = useContext(IssuesContext);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemsPerPage(itemsPerPage);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentIssues(issuesData.slice(itemOffset, endOffset));
    setFilteredIssues(issuesData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(issuesData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * itemsPerPage) % issuesData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={undefined}
        nextClassName="bg-gray-600 py-1 px-4 rounded-md text-gray-100"
        previousClassName="bg-gray-600 py-1 px-4 rounded-md text-gray-100"
        pageClassName="text-white-100"
        pageLinkClassName='py-1 px-4 rounded-md'
        containerClassName='flex items-center justify-around w-full md:w-2/3 fixed bottom-10'
        activeClassName='bg-purple-500'
      />
    </>
  );
}

export default Pagination