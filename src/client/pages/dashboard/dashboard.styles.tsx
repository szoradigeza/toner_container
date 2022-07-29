import styled from 'styled-components';
import { Button, Card, CardContent, CardHeader } from '@mui/material';

export const ButtonsContainer = styled.div`
    text-align: center;
`;

export const Btn = styled(Button)`
    margin: 10px;
`;

export const ChartWrapper = styled.div`
    background: white;
`;

export const styledCard = styled(Card)`
    background: #fff;
    /* box-shadow: 0 1rem 1rem -0.75rem rgb(105 96 215 / 18%); */
    border-radius: 16px;
    text-align: center;
    margin-top: 10px;
`;

export const ChartContainer = styled.div`
    position: relative;

    height: 50vh;
    width: auto;
`;

export const styledHeader = styled(CardHeader)`
    padding: 0px 0px 20px 0px !important;
    margin: 0 !important;
`;

export const styledCardContent = styled(CardContent)`
    padding: 0 !important;
    margin: 0 !important;
`;
