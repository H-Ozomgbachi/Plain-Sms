import {
  MessageReport,
  OtpReport,
  ResponseReport,
  TransactionReport,
} from "../../api/models/reports";
import { DateOnlyFormat } from "./sharedHelperMethods";

export function transactionTypeName(transactionCode: number) {
  switch (transactionCode) {
    case 1:
      return "SMS";
    case 2:
      return "OTP";
    case 3:
      return "DEPOSIT";
  }
}

export function refineTransactionsForDownload(data: TransactionReport[]) {
  return data.map((el) => {
    return {
      Date: DateOnlyFormat(el.createdUTC),
      "Transaction type": transactionTypeName(el.transactionType),
      Units: el.units,
      "Unit Price": el.unitPrice,
      Amount: el.amount,
    };
  });
}

export function refineOtpsForDownload(data: OtpReport[]) {
  return data.map((el) => {
    return {
      Recipient: `${el.recipient}`,
      "Created on": DateOnlyFormat(el.createdOnUtc),
      "Times Sent": el.sent,
      Expires: DateOnlyFormat(el.expiresOnUtc),
      "Verified Status": el.isVerified,
    };
  });
}

export function refineResponseForDownload(data: ResponseReport[]) {
  return data.map((el) => {
    return {
      Sender: `${el.sender}`,
      Date: DateOnlyFormat(el.createdOnUtc),
      Response: el.text,
      Code: el.responseCode,
      Recipient: el.recipient,
    };
  });
}

export function refineMessagesForDownload(data: MessageReport[]) {
  return data.map((el) => {
    return {
      Sender: `${el.sender}`,
      Date: DateOnlyFormat(el.createdOnUtc),
      Message: el.text,
      Type: el.messageType,
      Recipient: el.recipient,
    };
  });
}

export function refinePaymentHistoryForDownload(data: TransactionReport[]) {
  return data.map((el) => {
    return {
      Date: DateOnlyFormat(el.createdUTC),
      Amount: el.amount,
      "Transaction Id": el.id,
    };
  });
}
