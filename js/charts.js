const ctx = document.getElementById('populationChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Samoa', 'NZ', 'Australia'],
    datasets: [{
      label: 'Population',
      data: [200000, 5000000, 26000000]
    }]
  }
});