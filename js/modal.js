/*
===========================================================
Project Phoenix - World Explorer
File: modal.js

Purpose:
Display detailed information about the selected country
inside a Bootstrap modal.

Author: Sasa Milo
===========================================================
*/

/**
 * Opens the Country Details modal.
 *
 * @param {number} index
 * The position of the selected country in
 * window.lastCountries.
 */
function openCountryModal(index) {

    // --------------------------------------------------
    // Retrieve the selected country object
    // --------------------------------------------------
    const country = window.lastCountries?.[index];

    // --------------------------------------------------
    // Safety check
    // --------------------------------------------------
    if (!country) {
        alert("Country data not found.");
        return;
    }

    // --------------------------------------------------
    // Extract country information
    // --------------------------------------------------
    const name = country.name.common;
    const capital = country.capital?.[0] || "N/A";
    const region = country.region || "N/A";
    const population = country.population.toLocaleString();

    const flag = country.flags?.png || "";
    const area = country.area
    ? `${country.area.toLocaleString()} km²`
    : "N/A";

const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

    // --------------------------------------------------
    // Update modal title
    // --------------------------------------------------
    document.getElementById("countryModalLabel").textContent = name;

    // --------------------------------------------------
    // Build the modal body
    // --------------------------------------------------
    document.getElementById("countryModalBody").innerHTML = `

        <div class="text-center mb-4">

            <img
                src="${flag}"
                alt="${name} Flag"
                class="img-fluid rounded shadow"
                style="max-width:220px;">

        </div>

        <table class="table table-bordered">

            <tr>
                <th width="35%">🏛 Capital</th>
                <td>${capital}</td>
            </tr>

            <tr>
                <th>🌍 Region</th>
                <td>${region}</td>
            </tr>

            <tr>
                <th>👥 Population</th>
                <td>${population}</td>
            </tr>

            <tr>
                <th>📏 Area</th>
                <td>${area}</td>
            </tr>

            <tr>
                <th>🗣 Languages</th>
                <td>${languages}</td>
            </tr>

        </table>

    `;

    // --------------------------------------------------
    // Display Bootstrap modal
    // --------------------------------------------------
    const modal = new bootstrap.Modal(
        document.getElementById("countryModal")
    );

    modal.show();
}
