const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE;
const BASE_URL = 'https://www.alphavantage.co/query';


async function fetchJson(queryParams) {
    const url = `${BASE_URL}?${new URLSearchParams({
        ...queryParams,
        apikey: API_KEY,
    })}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();

}

export async function getDailyPerformance(ticker) {

    const json = await fetchJson({
        function: 'TIME_SERIES_DAILY',
        symbol: ticker,

    });

    console.log(json);

    return json;
}