import React, { useEffect, useState } from 'react';
import './style.css';

function Table({ columns, data, pagination }) {

    const [currentPage, setCurrentPage] = useState(1);

    const dataPerPage = pagination?.dataPerPage || 5;
    const totalPages = Math.ceil(data?.length / dataPerPage);

    const currentData = data.slice(
        (currentPage - 1) * dataPerPage,
        currentPage * dataPerPage
    );

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getVisiblePages = () => {
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };


    return (
        <div className="table-wrapper">
            <table aria-label="Table Data">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.indexKey}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.title} data-label={column.title}>
                                    {row[column.indexKey]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to Previous Page"
                >
                    Previous
                </button>
                <div className="pagination-numbers">
                    {currentPage > 3 && (
                        <>
                            <button
                                onClick={() => handlePageClick(1)}
                                aria-label="Page 1"
                            >
                                1
                            </button>
                            <span aria-hidden className="ellipsis">...</span>
                        </>
                    )}
                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => handlePageClick(page)}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}
                    {currentPage < totalPages - 2 && (
                        <>
                            <span aria-hidden className="ellipsis">...</span>
                            <button
                                onClick={() => handlePageClick(totalPages)}
                                aria-label={`Page ${totalPages}`}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to Next Page"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;
