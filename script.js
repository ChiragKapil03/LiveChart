let chartInstance;  // Declare a global variable to hold the chart instance

async function fetchData() {
    try {
        const response = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=h67eQ_JHilzbx_wCDNhT748RA2bQ1dii');
        const result = await response.json();
        console.log(result);
        return result;  
    } catch (error) {
        console.error(error);
    }
}

async function showChart() {
    let data = await fetchData();  
    if (!data || !data.results || data.results.length === 0) {
        console.error('No data available');
        return;  
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day-Low', 'Day-High', 'Current','Overall'],
            datasets: [{
                label: `${data.ticker}`,
                data: [data.results[0].l, data.results[0].h, data.results[0].c, data.results[0].o],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = () => {
    showChart();
    setInterval(showChart, 12000);  // Refresh chart every 12 seconds
};