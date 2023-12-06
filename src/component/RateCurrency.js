import React, { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Currency from '../Currency/Currency';
import './RateCurrency.css';

const RateCurrency = () => {
    const currencyFreaksAPILink = 'https://api.currencyfreaks.com/latest?apikey=5006340b261f48afa7bb857bf8a8d5ea&symbols=CAD,IDR,JPY,CHF,EUR,GBP';
    const [isLoading, setIsLoading] = useState(true);
    const [currencies, setCurrencies] = useState([]);
    const [currencyDate, setCurrencyDate] = useState("");

    // ---Function helper---
    const roundNumber = (value) => {
        return (Math.round((value + Number.EPSILON) * (1000)) / (1000));
    }

    const calculatePercent = (value, percent) => {
        return value * (percent / 100);
    }

    const formatDateTime = (dateTime) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const d = new Date(dateTime).toLocaleString('en-gb', options);
        setCurrencyDate(d);
    }

    const calculateBuyOrSell = (value, sign, percent) => {
        const percentValue = calculatePercent(value, percent);
        let result = (sign === '+') ? (value + percentValue) : (value - percentValue);
        return roundNumber(result);
    }
    // ---Function helper---

    const formatData = (data) => {
        let result = [];

        const rates = data.rates;
        for (const r in rates) {
            const currencyName = r;
            const currencyExchangeRate = parseFloat(rates[r]);
            const currencyBuy = calculateBuyOrSell(currencyExchangeRate, '+', 5);
            const currencySell = calculateBuyOrSell(currencyExchangeRate, '-', 5);

            result.push({
                name: currencyName,
                buy: currencyBuy,
                exchangeRate: currencyExchangeRate,
                sell: currencySell
            });
        }

        formatDateTime(data.date);
        setCurrencies(result);
    }

    useEffect(() => {
        const fetchCurrency = () => {
            return fetch(currencyFreaksAPILink)
                .then((res) => res.json())
                .then((data) => {
                    formatData(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        };
        fetchCurrency();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const renderTable = () => {
        if (!isLoading) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>
                                <i className="fa-solid fa-money-bill"></i>
                                Currency
                            </th>
                            <th>
                                <i className="fa-solid fa-cash-register"></i>
                                We Buy
                            </th>
                            <th>
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                                Exchange Rate
                            </th>
                            <th>
                                <i className="fa-solid fa-cart-shopping"></i>
                                We Sell
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies.map(c => {
                            return <Currency key={c.name} currency={c} />
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4}>On: {currencyDate}</td>
                        </tr>
                    </tfoot>
                </table>
            )
        }
        else {
            return (
                <div>
                    <div className="spin-container">
                        <br />
                        <div className="spin"></div>
                        <br /> <br />
                        <p>Please wait...</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <Fragment>
            {renderTable()}
        </Fragment>
    )
}

export default RateCurrency;