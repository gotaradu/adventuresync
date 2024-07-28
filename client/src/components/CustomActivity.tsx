import DrawedActivity from "../models/DrawedActivity";

import { Card, CardContent, Container } from "@mui/material";

import { CustomGraph } from "./custom-activity/CustomGraph";
import { CustomStats } from "./custom-activity/CustomStats";
import { CustomMiniMap } from "./custom-activity/CustomMiniMap";
export const CustomActivity: React.FC<{
  activity: DrawedActivity | null | undefined;
  StreamData: any;
}> = ({ activity, StreamData }) => {
  return (
    <Container>
      {activity && <CustomStats activity={activity} />}
      {activity?.mapExists && <CustomMiniMap activity={activity} />}
      {StreamData ? (
        <CustomGraph streamData={StreamData} streamType="StreamData" />
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            ------------------------------------------------------- StreamData
            graph should be here but the feature is not available on mock data
            -------------------------------------------------------
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
