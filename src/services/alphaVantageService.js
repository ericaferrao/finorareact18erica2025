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

    const timeSeries = json['Time Series (Daily)'];
    if (!timeSeries) return null;

    const [latestDate, previousDate] = Object.keys(timeSeries);
    console.log(latestDate, previousDate);

    if (!latestDate || !previousDate) return null;

    const latestClose = parseFloat(timeSeries[latestDate]['4. close']);
    const previousClose = parseFloat(timeSeries[previousDate]['4. close']);

    const performance = (((latestClose - previousClose) / previousClose) * 100).toFixed(2);


    return performance;
}