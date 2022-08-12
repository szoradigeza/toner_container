import React, { FC, useState, useEffect, useRef } from 'react';
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
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, Card, CardContent, CardHeader, Checkbox, Grid, Input, TextField } from '@mui/material';
import * as styles from './dashboard.styles';
import { useGetStatistics } from '@/api';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

export const labels = [];

const FormRow = (prop: any) => {
    return (
        <React.Fragment>
            <Grid item>
                <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} defaultChecked />
            </Grid>
            <Grid item>
                <span>{prop.label}</span>
            </Grid>
            <Grid item>
                <Input defaultValue="Győr" disabled {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} />
            </Grid>
        </React.Fragment>
    );
};

const DashBoardPage: FC = () => {
    const myChartRef = useRef(null);
    const { data, refetch } = useGetStatistics();
    const [chartData, setChartData] = useState({
        labels,
        datasets: [
            {
                label: 'kek',
                data: [],
                borderColor: 'rgb(0, 134, 223)',

                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y'
            },
            {
                label: 'piros',
                data: [],

                borderColor: 'rgb(255, 99, 132)',

                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'zold',
                data: [],
                borderColor: 'rgb(0, 255, 47)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

                yAxisID: 'y2'
            },
            {
                label: 'lila',
                data: [],
                borderColor: 'rgb(0, 255, 47)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

                yAxisID: 'y3'
            }
        ]
    });

    const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
            },
            zoom: {
                sensitivity: 3,
                speed: 10, // would be a percentage,
                limits: {
                    x: { min: 'original', max: 'original' }
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl'
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
                    mode: 'x'
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
            },
            y3: {
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
                    duration: 1000,
                    easing: 'easeOutCubic'
                }
            }
        }
    };

    const transformData = () => {
        const tmpChartData = JSON.parse(JSON.stringify(chartData));
        const dataObject: any[] = [];
        const newLabels: any[] = [];
        data.map((t: any) => {
            if (!newLabels.includes(t.date)) newLabels.push(t.date);
            const dataObj = dataObject.find((obj: any) => {
                return obj.label === t.name;
            });
            if (dataObj) {
                dataObj.data.push(t.value);
                return;
            }

            dataObject.push({
                label: t.name,
                data: [t.value]
            });
        });

        dataObject.forEach((element) => {
            const labelIdx = tmpChartData.datasets.findIndex((data: any) => element.label === data.label);

            tmpChartData.datasets[labelIdx].data = element.data;
        });

        tmpChartData.labels = newLabels;

        setChartData({ ...tmpChartData });
    };

    useEffect(() => {
        transformData();
    }, [data]);

    const onResetZoom = () => {
        refetch();
    };

    return (
        <>
            <styles.ChartWrapper>
                <styles.ChartContainer>
                    <Line options={options} data={chartData} ref={myChartRef} />
                </styles.ChartContainer>
                <styles.ButtonsContainer>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained" onClick={onResetZoom}>
                        {'Reset Zoom'}
                    </styles.Btn>
                    <styles.Btn sx={{ m: '0.2vw' }} variant="contained">
                        Save Logs to file
                    </styles.Btn>
                    <styles.FrToBtn>
                        <TextField placeholder="Type in here…" />
                    </styles.FrToBtn>
                </styles.ButtonsContainer>
            </styles.ChartWrapper>
            <styles.styledCard variant="outlined">
                <styles.styledHeader title="Chart options" />
                <styles.styledCardContent>
                    <Grid container>
                        {chartData.datasets.map((dataset) => (
                            <Grid container item spacing={1} sx={{ mb: '0.5vw' }}>
                                <FormRow label={dataset.label} />{' '}
                            </Grid>
                        ))}
                    </Grid>
                </styles.styledCardContent>
            </styles.styledCard>
        </>
    );
};

export default DashBoardPage;
