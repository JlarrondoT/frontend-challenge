import { useState } from 'react';
import './paginator.component.css';

export default function Paginator(props: {
  itemsPerPage: number;
  total: number;
  stateChanger: any;
}) {
  const [currentPagePosition, setCurrentPagePosition] = useState(1);

  const getPages = (itemsPerPage: number, total: number) => {
    return Array.from(Array(Math.ceil(total / itemsPerPage)).keys());
  };

  const handleChangePaginator = (input: 'nextPage' | 'prevPage' | number) => {
    let nextPos = currentPagePosition;
    if (
      input === 'nextPage' &&
      currentPagePosition < Math.ceil(props.total / props.itemsPerPage)
    ) {
      nextPos += 1;
    } else if (input === 'prevPage' && currentPagePosition > 1) {
      nextPos -= 1;
    } else if (typeof input === 'number') {
      nextPos = input;
    }
    setCurrentPagePosition(nextPos);
    props.stateChanger(nextPos);
  };

  return props.itemsPerPage && props.total ? (
    <div className="paginator-wrapper">
      <div
        className="arrow-box"
        onClick={() => handleChangePaginator('prevPage')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      {getPages(props.itemsPerPage, props.total).map((page) => (
        <span
          className={page + 1 === currentPagePosition ? 'actual-page' : ''}
          onClick={() => handleChangePaginator(page + 1)}
        >
          {page + 1}
        </span>
      ))}
      <div
        className="arrow-box"
        onClick={() => handleChangePaginator('nextPage')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  ) : null;
}
