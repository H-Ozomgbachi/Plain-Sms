import dateFormat from "dateformat";
import { QueryParam } from "../../api/models/shared";

export const queryStringBuilder = (query: QueryParam) => {
  const obj = query as any;

  const x = Object.entries(obj).map((el) => {
    if (el[1] !== "" && el[0] !== "id") {
      return `${el[0]}=${el[1]}`;
    } else {
      return "";
    }
  });
  return x.filter((el) => el !== "").join("&");
};

export function DateOnlyFormat(dateString: string) {
  return dateFormat(new Date(dateString).getTime(), "d/mmm/yyyy");
}

export function getNumberOfPages(totalRecords: number, pageSize: number) {
  return Math.ceil(totalRecords / pageSize);
}
