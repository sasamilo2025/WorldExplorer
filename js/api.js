/*
===========================================================
Project Phoenix - World Explorer
Stable API Layer (LOCAL MODE)
===========================================================
*/

async function getAllCountries() {

    // simulate async behavior (like real API)
    return new Promise((resolve) => {
        resolve(COUNTRIES_DATA);
    });
}


async function getCountryByName(name) {

    const result = COUNTRIES_DATA.filter(country =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
    );

    return result.length > 0 ? result : null;
}
