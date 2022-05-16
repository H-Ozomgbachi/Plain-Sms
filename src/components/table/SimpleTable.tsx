import "./SimpleTable.css";

interface Props<T> {
  titles: string[];
  data: T[];
  tableBodyBuilder: (el: T) => void;
}

export default function SimpleTable<T>({
  titles,
  data,
  tableBodyBuilder,
}: Props<T>) {
  return (
    <div className="table-responsive simple-table-container">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {titles.map((el) => (
              <th className="th-style" key={el}>
                {el}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="border-top-0">{data.map(tableBodyBuilder)}</tbody>
      </table>
    </div>
  );
}
