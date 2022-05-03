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
