import React from 'react';

const Currency = (props) => {
    return (
        <tr>
            <td>{props.currency.name}</td>
            <td>{props.currency.buy}</td>
            <td>{props.currency.exchangeRate}</td>
            <td>{props.currency.sell}</td>
        </tr>
    )
}

export default Currency;