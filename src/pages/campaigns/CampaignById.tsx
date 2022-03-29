import { useParams } from "react-router-dom";

export default function CampaignById() {
  let params = useParams();

  console.log(params.id);
  return <></>;
}
