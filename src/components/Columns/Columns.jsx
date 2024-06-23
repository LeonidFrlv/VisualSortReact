import "./Columns.css";
import { useMemo } from "react";
import { styled } from 'styled-components';

const StyledColumn = styled.div`
    background: ${props => props.$isHighlighted ? '#EC4A2A' : '#6D6F78' };
    min-width: 30px;
    height: ${props => props.$value / props.$maxInt * props.$MAX_SIZE_PERCENT + '%'}
`;

const StyledColumnValue = styled.div`
    color: ${props => props.$isHighlighted ? '#EC4A2A' : '#6D6F78' };
    font-size: 30px;
    height: 7%;
`;

const ColumnElement = ({ value, maxInt, isHighlighted }) => {
    const MAX_SIZE_PERCENT = 89;

    return (
        <div className={'column_wrapper'}>
            <StyledColumn $isHighlighted={isHighlighted} $value={value} $maxInt={maxInt} $MAX_SIZE_PERCENT={MAX_SIZE_PERCENT}/>
            <StyledColumnValue $isHighlighted={isHighlighted}>{value}</StyledColumnValue>
        </div>
    );
}

const Columns = ({columns}) => {
    const maxInt = useMemo(() => {
        let max = 0;
        columns.forEach(item => {
            max = Math.max(max, item.value);
        });
        return max;
    }, [columns])

    return (
        <div className='columns_wrapper'>
            <div className='columns' id='columns'>
                {columns.map(item => (
                    <ColumnElement key={item.key} value={item.value} isHighlighted={item.selected}  maxInt={maxInt} />
                ))}
            </div>
        </div>
    );
};

export default Columns;