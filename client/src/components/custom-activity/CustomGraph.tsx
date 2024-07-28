import { Card, CardContent } from "@mui/material";

import { LineChart } from "@mui/x-charts";

export const CustomGraph: React.FC<{
  streamData: { data: number[] }[];
  streamType: string;
}> = ({ streamData, streamType }) => {
  return (
    <>
      <Card>
        <CardContent sx={{ textAlign: "center" }}>
          <h1>{streamType}</h1>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <LineChart
            title={streamType}
            xAxis={[
              {
                data: streamData[0].data,
              },
            ]}
            series={[
              {
                data: streamData[1].data,
                showMark: false,
              },
            ]}
            height={400}
          />
        </CardContent>
      </Card>
    </>
  );
};
