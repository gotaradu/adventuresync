import DrawedActivity from "../models/DrawedActivity";

import { Card, CardContent, Container } from "@mui/material";

import { CustomGraph } from "./custom-activity/CustomGraph";
import { CustomStats } from "./custom-activity/CustomStats";
import { CustomMiniMap } from "./custom-activity/CustomMiniMap";
export const CustomActivity: React.FC<{
  activity: DrawedActivity | null | undefined;
  streamData: any;
}> = ({ activity, streamData }) => {
  return (
    <Container>
      {activity && <CustomStats activity={activity} />}
      {activity?.mapExists && <CustomMiniMap activity={activity} />}
      {streamData ? (
        <CustomGraph streamData={streamData} streamType="streamData" />
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            ------------------------------------------------------- streamData
            graph should be here but the feature is not available on mock data
            -------------------------------------------------------
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
