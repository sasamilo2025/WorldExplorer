//
    let lastCountries = [];
//
/*
    filterCountries function to search for countries based on user input
    it fetches all countries if not already cached, filters them based on the query,
    and displays the results. If no countries are found, it shows a message.
*/

async function filterCountries() {

    // const query = document.getElementById("searchBox").value.trim().toLowerCase();
    const query = document.getElementById("countrySearch").value.trim().toLowerCase();
   // const output = document.getElementById("output");
    const countriesContainer =
    document.getElementById("countriesContainer");

    if (query.length < 2) {
        countriesContainer.innerHTML = "Type at least 2 letters...";
        return;
    }

        countriesContainer.innerHTML = "Searching... 🌍";

    const countries = await getAllCountries();

    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );

    // ✅ STORE HERE (correct scope)
    window.lastCountries = filtered;

    if (filtered.length === 0) {
        countriesContainer.innerHTML = "No countries found ❌";
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

    } /* --end of getFlag() -- */

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
         

