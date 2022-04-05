import { customHistory } from "../..";
import { CampaignData } from "../../api/models/campaign";
import "./SimpleTable.css";

interface Props {
  titles: string[];
  data: CampaignData[];
}

export default function SimpleTable({ titles, data }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {titles.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>

        <tbody className="border-top-0">
          {data.map((el) => (
            <tr
              key={el.id}
              onClick={() => customHistory.push(`/campaigns/${el.uniqueId}`)}
              className="pointer-cursor"
            >
              <td>{el.name}</td>
              <td>{el.callbackUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
