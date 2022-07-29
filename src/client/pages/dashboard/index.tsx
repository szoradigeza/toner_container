import React, { FC, useState, useEffect } from 'react';
import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';
import './index.less';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Button, Card, CardContent, CardHeader, Checkbox, Grid, Input, TextField } from '@mui/material';
import * as styles from './dashboard.styles';
import { red } from '@mui/material/colors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index' as const,
        intersect: false
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis'
        }
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false
            }
        },
        y2: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false
            }
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data: ChartData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y'
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(0, 255, 47)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1'
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(0, 134, 223)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y2'
        }
    ]
};

const FormRow = () => {
    return (
        <React.Fragment>
            <Grid item>
                <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} defaultChecked />
            </Grid>
            <Grid item>
                <Input defaultValue="Győr" disabled {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} />
            </Grid>
            <Grid item>
                <Input defaultValue="Győr" disabled {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} />
            </Grid>
        </React.Fragment>
    );
};
console.log(data);

const DashBoardPage: FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <styles.ChartWrapper>
                <styles.ChartContainer>
                    <Line options={options} data={data} />
                </styles.ChartContainer>
                <styles.ButtonsContainer>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'<< Scroll'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'< Scroll'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'<< Zoom Out'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'<< Zoom In'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'Scroll >'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        {'Scroll >>'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        Clear Logs
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        Save Logs to file
                    </styles.Btn>
                </styles.ButtonsContainer>
            </styles.ChartWrapper>
            <styles.styledCard variant="outlined">
                <styles.styledHeader title="Chart options" />
                <styles.styledCardContent>
                    <Grid container>
                        <Grid container item spacing={1} sx={{ mb: '0.5vw' }}>
                            <FormRow />
                        </Grid>
                        <Grid container item spacing={1} sx={{ mb: '0.5vw' }}>
                            <FormRow />
                        </Grid>
                        <Grid container item spacing={1} sx={{ mb: '0.5vw' }}>
                            <FormRow />
                        </Grid>
                    </Grid>
                </styles.styledCardContent>
            </styles.styledCard>
        </>
    );
};

export default DashBoardPage;
