import _ from "lodash";

export const PriorityOptions = _.sortBy(
  [
    { text: "Regular", value: "0" },
    { text: "High", value: "1" },
  ],
  (c) => c.text
);
