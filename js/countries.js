/*---------------------------------------------------------
 STEP 1
 Load all countries from the API.

 We reuse the existing API function instead of making
 another fetch request.

 Commander Tip:
 Reuse code whenever possible.
---------------------------------------------------------*/

    function getCapital(country) {

    return country.capital?.[0] || "📍 Not Available";

}  // <-- End of getCapital()
    

    async function loadCountries() {

    // Find the HTML container where all cards will appear
    const container = document.getElementById("countriesContainer");


    // Show a loading message while waiting for the API
    container.innerHTML = `
        <div class="text-center">
            <h3>Loading countries... 🌍</h3>
        </div>
    `;


    // Retrieve all countries from our API layer
    const countries = await getAllCountries();


    /*-----------------------------------------------------
     STEP 2
     Sort countries alphabetically.

     localeCompare() correctly compares text in
     different languages.
    -----------------------------------------------------*/

    countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)

    ); // <-- End of sort()


    /*-----------------------------------------------------
     STEP 3
     Convert each country into a Bootstrap card.

     map()

     Takes one country object

            ↓

     Returns one HTML card.

     Finally join() combines every card into
     one large HTML string.
    -----------------------------------------------------*/

    /*---------------------------------------------------------
 STEP 4

 Render all country cards.

 Instead of creating HTML inside loadCountries(),
 we let renderCountries() handle that job.

 This keeps rendering in ONE place only.
---------------------------------------------------------*/

    renderCountries(countries);

}   // ← End of loadCountries()

/*
-------------------------------------------------------
Save the currently displayed countries.

Other JavaScript files (such as modal.js)
can access this same list without loading
or searching the data again.
-------------------------------------------------------
*/
   // window.lastCountries = countries;

/*---------------------------------------------------------
 STEP 5

 Run automatically when the page opens.

 This is the entry point for this page.
---------------------------------------------------------*/

// loadCountries(); 

/*---------------------------------------------------------
 PAGE INITIALIZATION CHECK

 Only run loadCountries() when the Countries page exists.

 Search page can reuse renderCountries()
 without automatically loading the full country list.
---------------------------------------------------------*/

const countriesContainer = document.getElementById("countriesContainer");

if (countriesContainer) {
    loadCountries();
}


