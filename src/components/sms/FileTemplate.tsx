import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import CustomDefaultTabHeading from "../headings/CustomDefaultTabHeading";
import "./FileTemplate.css";

export default function FileTemplate() {
  return (
    <div>
      <CustomDefaultTabHeading content="Recipients &amp; Messages Templates" />

      <div className="card mt-3 p-3 shadow-sm">
        <h4 className="file-template-heading">Recipients only template</h4>

        <p className="file-template-detail">
          Use this template if you intend to send{" "}
          <span className="text-danger">one message to many recipeints</span>.
          The template contains a single column named recipients.
        </p>

        <Link
          className="official-download-btn"
          to="/files/Plain-sms-template-format.xlsx"
          download
          target={"_blank"}
        >
          Download Template <Icon name="angle double down" />
        </Link>
      </div>

      <div className="card mt-3 p-3 shadow-sm">
        <h4 className="file-template-heading">
          Recipients with messages template
        </h4>

        <p>
          Use this template if you intend to send{" "}
          <span className="text-danger">many messages to many recipients.</span>{" "}
          The template contains a single column named recipients.
        </p>

        <Link
          className="official-download-btn"
          to="/files/Plain-sms-template-format.xlsx"
          download
          target={"_blank"}
        >
          Download Template <Icon name="angle double down" />
        </Link>
      </div>
    </div>
  );
}
