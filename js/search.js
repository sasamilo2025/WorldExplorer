    // Global array to store all countries
    let countries = [];
    //
    // Load Countries API
    //
    async function loadCountries() {
    const output = document.getElementById("output");

    try {

        const response = await fetch(
            "https://countries.dev/countries?fields=name,capital,region,population"
        );

            countries = await response.json();
             displayCountries([]); 

        } catch (error) {
            console.error(error);
            output.textContent = "Something went wrong.";
        }
    }

        displayCountries(countries);
    //
    // displays a list of all countries 
    function displayCountries(countryList) {
        const output = document.getElementById("output");
        let html = "";

        countryList.forEach(country => {
            html += `
                <div style="margin-bottom:15px; padding:10px; border:1px solid #ccc;">
                    <h3>${country.name}</h3>
                    <p><b>Capital:</b> ${country.capital}</p>
                    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                </div>
            `;
        });

        output.innerHTML = html;
    }
    /* -----------------------------------------------------------------
            Filter Counteries apply Filter Process
       --------------------------------------------------------------- */
    function filterCountries() {
        const searchText = document.getElementById("searchBox").value.toLowerCase();
        
        const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(searchText)
           
        );
    //
    //  check search/filter if blanks
    //
        function filterCountries() {

    const searchText = document
        .getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();

    // ⭐ NEW RULE: if empty → show nothing
    if (searchText === "") {
        displayCountries([]);
        return;
    }

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchText)
    );
}
   
        displayCountries(filteredCountries);  //displays only countries match the searchBox

    }
    /* After Page is loaded, call loadCountries function
    //  and the url-data will be stored in memeory
    *///////////////////////////////////////////////////
        window.onload = loadCountries;
    //
