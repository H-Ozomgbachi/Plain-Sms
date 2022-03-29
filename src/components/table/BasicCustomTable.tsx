import React from "react";
import { Table } from "semantic-ui-react";

interface Props<T> {
  headerTitles: string[];
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  data: T[];
}

export default function BasicCustomTable<T extends unknown>({
  headerTitles,
  data,
  keyExtractor,
  renderItem,
}: Props<T>) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {headerTitles.map((el, index) => (
            <Table.HeaderCell key={index}>{el}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => (
          <Table.Row key={keyExtractor(item)}>{renderItem(item)}</Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
