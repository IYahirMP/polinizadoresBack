import { Box, Container, Typography } from "@mui/material";
import { ChartsAxis, ChartsXAxis, ChartsYAxis, LineChart } from "@mui/x-charts";

export function Graph ({title, xData, yData}){
    return (
        <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
          <Container height="10%">
            <Typography variant="h6" textAlign={'center'}>{title}</Typography>
            </Container>
          <Box height={"90%"} width={"100%"}>
            <LineChart
              xAxis={[{data: xData, scaleType: 'point' }]}
              series={[{data: yData,},]}
              grid={{horizontal:true, vertical:false}
              }
            />
          </Box>
        </Box>
    );
};