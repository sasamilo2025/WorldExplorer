/*
    filterCountries function to search for countries based on user input
    it fetches all countries if not already cached, filters them based on the query,
    and displays the results. If no countries are found, it shows a message.
*/
async function filterCountries() {

    const query = document.getElementById("searchBox").value.trim().toLowerCase();
    const output = document.getElementById("output");

    if (query.length < 2) {
        output.innerHTML = "Type at least 2 letters...";
        return;
    }

    output.innerHTML = "Searching... 🌍";

    const countries = await getAllCountries();

    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );

    // ✅ STORE HERE (correct scope)
    window.lastCountries = filtered;

    if (filtered.length === 0) {
        output.innerHTML = "No countries found ❌";
        return;
    }

    displayCountries(filtered);
}

function displayCountries(countries) {

    const output = document.getElementById("output");

    output.innerHTML = countries.map(country => {

        const population = country.population
            ? country.population.toLocaleString()
            : "N/A";

        const capital = country.capital?.[0] || "N/A";
        const flag = country.flags?.svg || "";

        return `
        <div class="card mt-3 p-3 shadow-sm country-card"
             style="cursor:pointer"
             onclick="openCountryModal('${country.name.common}')">

            <h3>${country.name.common}</h3>
            <p>🌍 Region: ${country.region || "N/A"}</p>
            <p>🏛 Capital: ${capital}</p>
            <p>👥 Population: ${population}</p>
            ${flag ? `<img src="${flag}" width="120">` : ""}

        </div>
        `;
    }).join("");
}
/* 
    modal for country details, including national anthem if available
----------------------------------------------------------------------*/
    function openCountryModal(countryName) {

    const countries = window.lastCountries || [];

    // Find the selected country safely
    const country = countries.find(
        c => c.name.common === countryName
    );
    // If the country is not found, show an error message in the modal
    // ✅ FIXED: Added check for undefined country
    // If the country is not found, show an error message in the modal

        if (!country) {
            document.getElementById("modalTitle").innerText = "Country not found";

            document.getElementById("modalBody").innerHTML = `
                <p style="color:red;">
                    ⚠️ Sorry, this country data is not available.
                 </p>
        `;

        const modal = new bootstrap.Modal(
        document.getElementById("countryModal")
        );

        modal.show();

        return;
        }

         const population = country.population
        ? country.population.toLocaleString()
        : "N/A";

        const capital = country.capital?.[0] || "N/A";
        const region = country.region || "N/A";

        document.getElementById("modalTitle").innerText = country.name.common;

        document.getElementById("modalBody").innerHTML = `
        <div>
            <img src="${country.flags.svg}" width="140" style="margin-bottom:10px">

            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Population:</strong> ${population}</p>
        </div>
        `;

        const modal = new bootstrap.Modal(
        document.getElementById("countryModal")
        );

        modal.show();
}
