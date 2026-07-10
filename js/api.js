/*
===========================================================
Project Phoenix - World Explorer

API Layer (LIVE MODE)

Purpose:
- Load country data from external API
- Convert API response into Phoenix format
- Cache data in memory
- Provide fallback protection
===========================================================
*/


// External country API
const COUNTRIES_API_URL =
    "https://api.sampleapis.com/countries/countries";


// Memory cache
let countriesCache = null;



async function getAllCountries() {


    // Return existing data if already loaded
    if (countriesCache) {
        return countriesCache;
    }


    try {

        // Request data from external API
        const response = await fetch(COUNTRIES_API_URL);


        // Convert response to JSON
        const data = await response.json();

        // Debugging: Log the raw API response
        console.log(data[0]);

        // Convert API structure into Project Phoenix structure
        countriesCache = data

            // Remove incomplete records

            .filter(country =>
                 country.name &&
                  isValidImageUrl(country.media?.flag) &&
                  country.capital
        )   

            // Transform fields
            .map(country => ({

                name: {
                    common: country.name
                },


                capital: [
                    country.capital || "N/A"
                ],


                population:
                    country.population || 0,


                flags: {

                    svg:
                        isValidImageUrl(country.media?.flag)
                            ? country.media.flag
                            : ""

                },


                currency:
                    country.currency || "N/A",


                phone:
                    country.phone || "N/A",


                emblem:
                    country.media?.emblem || "",


                globe:
                    country.media?.orthographic || ""

            }))


            // Always display alphabetically
            .sort((a, b) =>
                a.name.common.localeCompare(
                    b.name.common
                )
            );


        return countriesCache;


    } catch (error) {


        console.error(
            "API loading failed. Using local backup data.",
            error
        );


        return COUNTRIES_DATA;
    }
}




async function getCountryByName(name) {


    const countries = await getAllCountries();


    const result = countries.filter(country =>

        country.name.common
            .toLowerCase()
            .includes(
                name.toLowerCase()
            )

    );


    return result.length > 0
        ? result
        : null;

}

// ---------------------------------------------------
// Helper function
// Validates that an image URL is usable
// ---------------------------------------------------

    function isValidImageUrl(url) {

    if (!url) {
        return false;
    }


    return (
        url.startsWith("http://") ||
        url.startsWith("https://")
    );

}



