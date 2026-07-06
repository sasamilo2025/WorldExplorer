/**
 * Load and display global statistics about countries.
 * This function runs automatically when the page loads.
 */
async function loadStats() {

    // Get the HTML container where we will display results
    const output = document.getElementById("statsOutput");

    // Fetch all countries (from cached API function)
    const countries = await getAllCountries();

    // -----------------------------
    // 1. TOTAL NUMBER OF COUNTRIES
    // -----------------------------
    const totalCountries = countries.length;

    // -----------------------------
    // 2. TOTAL WORLD POPULATION
    // -----------------------------
    // We loop through all countries and add up population values
    const totalPopulation = countries.reduce((sum, country) => {
        return sum + (country.population || 0); // fallback to 0 if missing
    }, 0);

    // -----------------------------
    // 3. REGION BREAKDOWN
    // -----------------------------
    // We create an object like:
    // { Asia: 50, Europe: 40, Africa: 60 }
    const regions = {};

    countries.forEach(country => {
        const region = country.region || "Other";

        // If region exists, increment count, otherwise start at 1
        regions[region] = (regions[region] || 0) + 1;
    });
        // Convert regions object into chart-friendly arrays
        const regionLabels = Object.keys(regions);
        const regionValues = Object.values(regions);

    // -----------------------------
    // 4. DISPLAY RESULTS IN HTML
    // -----------------------------
    output.innerHTML = `
        <!-- Total countries card -->
        <div class="card p-4 mb-3">
            <h3>🌍 Total Countries</h3>
            <p>${totalCountries}</p>
        </div>

        <!-- Total population card -->
        <div class="card p-4 mb-3">
            <h3>👥 World Population</h3>
            <p>${totalPopulation.toLocaleString()}</p>
        </div>

        <!-- Region breakdown card -->
        <div class="card p-4">
            <h3>🗺 Regions</h3>
            <ul>
                ${Object.entries(regions).map(([region, count]) => `
                    <li><strong>${region}:</strong> ${count}</li>
                `).join("")}
            </ul>
        </div>
    `;
/* =========================
   REGION BAR CHART
========================= */

new Chart(document.getElementById("regionBarChart"), {
    type: "bar",
    data: {
        labels: regionLabels,
        datasets: [{
            label: "Countries per Region",
            data: regionValues
        }]
    }
});


/* =========================
   REGION PIE CHART
========================= */

new Chart(document.getElementById("regionPieChart"), {
    type: "pie",
    data: {
        labels: regionLabels,
        datasets: [{
            label: "Regions",
            data: regionValues
        }]
    }
});
    
}  // LoadStats function Ends Here

// Run the function automatically when page loads
loadStats();
//

