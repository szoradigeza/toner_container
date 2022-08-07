import React, { FC, useState, useEffect, useRef } from 'react';
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
import { Line, getDatasetAtEvent } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Button, Card, CardContent, CardHeader, Checkbox, Grid, Input, TextField } from '@mui/material';
import * as styles from './dashboard.styles';
import { red } from '@mui/material/colors';
import { useGetStatistics } from '@/api';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

export const labels = [];

// export const data1: ChartData = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             yAxisID: 'y'
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(0, 255, 47)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             yAxisID: 'y1'
//         },
//         {
//             label: 'Dataset 3',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(0, 134, 223)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             yAxisID: 'y2'
//         }
//     ]
// };
//

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

const DashBoardPage: FC = () => {
    const [loading, setLoading] = useState(true);
    const [queryKey, setQueryKey] = useState();
    const myChartRef = useRef(null);
    const { data, error, isLoading, refetch } = useGetStatistics(queryKey);
    const [chartData, setChartData] = useState({
        labels,
        datasets: [
            {
                label: 'kek',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y'
            },
            {
                label: 'piros',
                data: [],
                borderColor: 'rgb(0, 255, 47)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'zold',
                data: [],
                borderColor: 'rgb(0, 134, 223)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y2'
            }
        ]
    });

    console.log(chartData);
    const startFetch = ({ chart }) => {
        const { min, max } = chart.scales.x;
        console.log(chartData.labels[min]);
        console.log(chartData.labels[max]);
        console.log(min);
        console.log(max);
        //setQueryKey(`min=${chartData.labels[min]}&&max=${chartData.labels[max]}`);
    };

    const options: ChartOptions = {
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
            },
            zoom: {
                limits: {
                    x: { min: 'original', max: 'original', minRange: 60 * 1000 }
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                    onPanComplete: startFetch
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    drag: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                    onZoomComplete: startFetch
                }
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
        },
        transitions: {
            zoom: {
                animation: {
                    duration: 100
                }
            }
        }
    };

    const transformData = () => {
        console.log(myChartRef.current);
        const tmpChartData = JSON.parse(JSON.stringify(chartData));
        const dataObject: any[] = [];
        const newLabels: any[] = [];
        data.map((t: any) => {
            if (!newLabels.includes(t.date)) newLabels.push(t.date);
            console.log(dataObject);
            const dataObj = dataObject.find((obj: any) => {
                console.log(obj.label);
                console.log(obj.name);
                return obj.label === t.name;
            });
            console.log(dataObj);
            if (dataObj) {
                // console.log('here');
                dataObj.data.push(t.value);
                return;
            }

            // console.log('ide');
            dataObject.push({
                label: t.name,
                data: [t.value]
            });
        });
        console.log(dataObject);

        dataObject.forEach((element) => {
            const labelIdx = tmpChartData.datasets.findIndex((data: any) => element.label === data.label);

            tmpChartData.datasets[labelIdx].data = element.data;
        });

        console.log(newLabels);
        tmpChartData.labels = newLabels;

        console.log(tmpChartData);
        setChartData({ ...tmpChartData });
    };

    useEffect(() => {
        transformData();
        // chart.stop(); // make sure animations are not running
        // const { min, max } = chart.scales.x;
        // chart.data.datasets[0].data = [1, 2, 3].map(() => faker.datatype.number({ min: -1000, max: 1000 }));
        // chart.update('none');
    }, [data]);

    return (
        <>
            <styles.ChartWrapper>
                <styles.ChartContainer>
                    <Line options={options} data={chartData} ref={myChartRef} />
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
