/*=========================================================
 Project Phoenix

 COUNTRY RENDERER

 Shared rendering functions used by multiple pages.

 Responsibilities:
 • Display country cards
 • Display country flags
 • Maintain currently displayed country list

 This file contains NO API calls and NO search logic.

=========================================================*/

/*---------------------------------------------------------
 GET FLAG

 Returns the country's flag image.

 If no flag is available from the API,
 use the local placeholder image.
---------------------------------------------------------*/

function getFlag(country) {

    const flag = country.flags?.svg;

    return flag || "images/no-flag.jpg";

}  // <-- End of getFlag()

   // ---------------------------------------------------------
    function renderCountries(countries) {

    const countriesContainer = document.getElementById("countriesContainer");
    
    const html = countries.map((country, index) => `
      
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">

            <div class="card country-card h-100 shadow-sm">

            <div class="card-body text-center">

                <h5 class="card-title">

                     ${country.name.common}

                </h5>

                    <img
                        src="${getFlag(country)}"
                        class="country-flag img-fluid"
                        alt="${country.name.common} Flag">                  
  
                <button                   
                         class="btn btn-primary mt-1"
                         onclick="openCountryModal(${index})">

                    🔍 View Details

                </button>

            </div>

        </div>

        </div>

    `).join("");

            countriesContainer.innerHTML = html;
        /*
            -------------------------------------------------------
            Save the currently displayed countries.

            Other JavaScript files (such as modal.js)
            can access this same list without loading
            or searching the data again.
            -------------------------------------------------------
        */
            window.lastCountries = countries;

    }  // <-- End of renderCountries()
