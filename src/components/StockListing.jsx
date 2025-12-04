import React from 'react';
import { getDailyPerformance } from '../services/alphaVantageService';
import { useState } from 'react';
import '../App.css'
import { createClient } from '@supabase/supabase-js';


export default function StockListing({ userId }) {

    const [symbol, setSymbol] = useState('');
    const [performance, setPerformance] = useState('');
    const [error, setError] = useState('');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function handleSubmit(event) {

        event.preventDefault();



        await supabase.from("watchlist").insert({ symbol: symbol.toUpperCase(), user_id: userId });
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