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

     Example:

     Australia
     Brazil
     Japan
     Samoa
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
    
    const html = countries.map(country => `

        <div class="col-md-4">

            <div class="card h-100 shadow-sm">

                <img
                    src="${country.flags?.png ?? country.flags?.svg ?? "https://via.placeholder.com/150"}"
                    class="card-img-top"
                    alt="${country.name.common} Flag">

                <div class="card-body">

                    <h5 class="card-title">

                        ${country.name.common}

                    </h5>

                    <p>

                        <strong>Capital:</strong>

                        ${country.capital?.[0] || "N/A"}

                    </p>

                    <p>

                        <strong>Region:</strong>

                        ${country.region}

                    </p>

                    <button
                        class="btn btn-primary"

                        onclick="openCountryModal('${country.name.common}')">

                        View Details

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

}


/*---------------------------------------------------------
 STEP 5

 Run automatically when the page opens.

 This is the entry point for this page.
---------------------------------------------------------*/

loadCountries();
