import { QueryParam } from "../api/models/shared";
import moment from "moment";

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const autoLinkClick = (href: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_self";
  document.body.appendChild(link);
  link.click();
};

export const queryStringBuilder = (query: QueryParam) => {
  const obj = query as any;

  const queryParameters = Object.entries(obj).map((el) => {
    if (el[1] !== "" && el[0] !== "id") {
      return `${el[0]}=${el[1]}`;
    } else {
      return "";
    }
  });
  return queryParameters.filter((el) => el !== "").join("&");
};

export function DateOnlyFormat(dateString: string) {
  return moment(dateString).format("DD-MMM-yyyy hh:mm a");
}

export function getNumberOfPages(totalRecords: number, pageSize: number) {
  return Math.ceil(totalRecords / pageSize);
}

export function toUTCConverter(dateObject: Date | string) {
  return new Date(new Date(dateObject).toUTCString()).toISOString();
}

export const NairaFormatter = (value: number) => {
  const result = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "NGN",
  }).format(value);

  return result.replace("NGN", "₦");
};
