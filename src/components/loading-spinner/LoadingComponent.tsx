import { observer } from "mobx-react-lite";
import { Bars } from "react-loader-spinner";
import { Dimmer } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  active: boolean;
}

export default observer(function LoadingComponent({
  inverted = true,
  active,
}: Props) {
  return (
    <Dimmer active={active} inverted={inverted}>
      <Bars height="100" width="100" color="#6c5ce7" />
    </Dimmer>
  );
});
