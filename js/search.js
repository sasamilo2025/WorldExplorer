//
    let lastCountries = [];
//
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

    //displayCountries(filtered);
      renderCountries(filtered);
}
/*
    Helper function:
    Formats population numbers with commas.
    Example:
    1234567 → 1,234,567
*/
function getPopulation(country) {

    return country.population
        ? country.population.toLocaleString()
        : "👥 Not Available";
}
/*
    Helper function:
    Returns the first capital city.
    Some countries do not have capitals,
    so we provide a safe fallback.
*/
function getCapital(country) {

    return country.capital?.[0] || "📍 Not Available";
}

/*
    Helper function:
    Returns the country flag image.
    Some countries may not have an SVG flag.
*/
    function getFlag(country) {
                
            console.log("getFlag for:", country.name.common);

        if (country.name.common === "Afghanistan") {
        console.log(">>> Using placeholder <<<");
        return "images/no-flag.jpg";
    }

        console.log(">>> Using real flag <<<");
        return country.flags?.svg;

    }

/*
    Helper function:
    Returns the Phone Code.
    Some countries may not have phonre codes, so we provide a safe fallback.
*/
    function getPhone(country) {
    return country.phone || "☎️ Not Available";
}
    function getCurrency(country) {
    return country.currency || "💰 Not Available";
}
         
/*------------------------------------------------------*/

    function displayCountries(countries) {

    const output = document.getElementById("output");

    
    output.innerHTML = countries.map(country => {

        const flag = getFlag(country);

               
        return `
        <div class="card mt-3 p-3 shadow-sm country-card text-center"
             style="cursor:pointer"
             onclick="openCountryModal('${country.name.common}')">

            <h3 class="mb-3">
                ${country.name.common}
            </h3>

            ${
                flag
                    ? `<img src="${flag}"
                            width="140"
                            height="90"
                            class="mx-auto d-block mb-3">`
                    : ""
            }

            <button class="btn btn-primary">
                View Details
            </button>
        
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

         const population = getPopulation(country);
         const capital = getCapital(country);
         const flag = getFlag(country);

             
        document.getElementById("modalTitle").innerText = country.name.common;

        document.getElementById("modalBody").innerHTML = `
        <div class="text-center">

        ${flag ? `<img src="${flag}" width="140" class="mb-3">` : ""}

            <p><strong>🏛 Capital:</strong> ${capital}</p>
            <p><strong>👥 Population:</strong> ${population}</p>
            <p><strong>💰 Currency:</strong> ${currency}</p>
            <p><strong>📞 Phone Code:</strong> ${phone}</p>

        ${
            emblem
            ? `<h5 class="mt-4">National Emblem</h5>
               <img src="${emblem}" width="120">`
            : ""
        }

         ${
        globe
            ? `<h5 class="mt-4">Location</h5>
               <img src="${globe}" width="180">`
            : ""
        }

    </div>
    `;
    }
