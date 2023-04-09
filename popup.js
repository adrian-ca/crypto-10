function updateTable(cryptos) {
  const table = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];

  cryptos.forEach((crypto, index) => {
    const row = table.insertRow();
    const rankCell = row.insertCell(0);
    const symbolCell = row.insertCell(1);
    const nameCell = row.insertCell(2);
    const priceCell = row.insertCell(3);
    const change24hCell = row.insertCell(4);

    rankCell.textContent = index + 1;

    const img = document.createElement('img');
    img.src = crypto.image;
    img.alt = crypto.symbol.toUpperCase();
    img.width = 24;
    img.height = 24;
    symbolCell.appendChild(img);

    nameCell.textContent = crypto.name;
    priceCell.textContent = `$${parseFloat(crypto.current_price).toFixed(2)}`;
    change24hCell.textContent = `${parseFloat(crypto.price_change_percentage_24h).toFixed(2)}%`;
  });
}

function createChart(cryptos) {
  const ctx = document.getElementById('priceChart').getContext('2d');
  const labels = cryptos.map(crypto => crypto.symbol.toUpperCase());
  const data = cryptos.map(crypto => crypto.current_price);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Price (USD)',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index, values) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

async function fetchTopTenCryptos() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  const data = await response.json();
  updateTable(data);
  createChart(data);
}

fetchTopTenCryptos();
