import _ from "lodash";

export const CountryCodeOptions = _.sortBy(
  [{ text: "+234", value: "+234" }],
  (c) => c.text
);
