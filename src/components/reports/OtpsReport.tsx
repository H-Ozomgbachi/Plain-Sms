import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import FilterOtpForm from "./FilterOtpForm";
import FilterOtpsContent from "./FilterOtpsContent";

export default function OtpsReport() {
  return (
    <div>
      <CustomDefaultTabHeading content="One-Time-Passwords" />

      <FilterOtpForm />

      <FilterOtpsContent />
    </div>
  );
}
