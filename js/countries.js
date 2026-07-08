/*---------------------------------------------------------
 STEP 1
 Load all countries from the API.

 We reuse the existing API function instead of making
 another fetch request.

 Commander Tip:
 Reuse code whenever possible.
---------------------------------------------------------*/

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
    );


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
    
    const html = countries.map((country, index) => `
      
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">

            <div class="card country-card h-100 shadow-sm">

                   <img
                    src="${country.flags?.svg || "assets/images/no-flag.jpg"}"
                    class="card-img-top country-flag"
                    alt="${country.name.common} Flag">

                <div class="card-body">

                    <h5 class="card-title">

                        ${country.name.common}

                    </h5>


                        <button class="btn btn-primary"
                        onclick="openCountryModal(${index})">

                        🔍 View Details

                        </button>

                </div>

            </div>

        </div>

    `).join("");


    /*-----------------------------------------------------
     STEP 4
     Display everything.

     We only update the HTML once.

     This is faster than adding one card at a time.
    -----------------------------------------------------*/

    container.innerHTML = html;

/*
-------------------------------------------------------
Save the currently displayed countries.

Other JavaScript files (such as modal.js)
can access this same list without loading
or searching the data again.
-------------------------------------------------------
*/
    window.lastCountries = countries;
}
/*---------------------------------------------------------
 STEP 5

 Run automatically when the page opens.

 This is the entry point for this page.
---------------------------------------------------------*/

loadCountries();
