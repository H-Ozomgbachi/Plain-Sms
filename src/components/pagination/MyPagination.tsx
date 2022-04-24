import "./MyPagination.css";
import { Icon, Pagination } from "semantic-ui-react";

interface Props {
  totalPages: number;
  handlePageChange: (pageIndex: number) => void;
}

export default function MyPagination({ totalPages, handlePageChange }: Props) {
  return (
    <Pagination
      defaultActivePage={1}
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
      }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      totalPages={totalPages}
      onPageChange={(e, data) => handlePageChange(data.activePage as number)}
    />
  );
}
