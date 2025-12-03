import React from 'react';
import { getDailyPerformance } from '../services/alphaVantageService';
import { useState } from 'react';
import '../App.css'


export default function StockListing() {

    const [symbol, setSymbol] = useState('');
    const [performance, setPerformance] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setPerformance('');

        try {
            const perf = await getDailyPerformance(symbol.toUpperCase());

            if (perf === null) {
                setError('Could not fetch performance data. Please check the ticker symbol.');
            }
            else {
                setPerformance(`Daily Performance: ${perf}%`);
            }
        } catch {
            setError('An error occurred while fetching data.');
        }
    }



    return (
        <div>
            {/* <p>{userId}</p> */}
            <form className='stock-form' onSubmit={handleSubmit}>
                <input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock ticker symbol"
                />
                <button>Get Performance</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {performance && <p style={{ color: performance > 0 ? 'green' : 'red' }}>{performance}</p>}
            </form>
        </div>
    );



}