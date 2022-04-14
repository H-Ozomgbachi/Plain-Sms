import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import "./SimpleTable.css";

interface Props<T> {
  titles: string[];
  data: T[];
  tableBuilderFunction: (el: T) => ReactJSXElement;
}

export default function SimplePaginatedTable<T>({
  titles,
  data,
  tableBuilderFunction,
}: Props<T>) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {titles.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>

        <tbody className="border-top-0">{data.map(tableBuilderFunction)}</tbody>
      </table>
    </div>
  );
}
