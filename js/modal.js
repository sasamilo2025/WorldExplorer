/*=========================================================
    PHOENIX DETAILS MODAL

    Opens the selected country's details.
=========================================================*/

function openCountryModal(index) {

    // Get the selected country
    const country = window.lastCountries[index];

    // Safety check
    if (!country) return;

    // Country name
    document.getElementById("modalCountryName").textContent =
        country.name.common;

    // Flag image
    document.getElementById("modalFlag").src =
        country.flags?.svg || "assets/images/no-flag.jpg";

    // Flag description
    document.getElementById("modalFlag").alt =
        `${country.name.common} Flag`;

    // Country details
    document.getElementById("modalDetails").innerHTML = `

        <p><strong>🏛 Capital:</strong>
        ${country.capital?.[0] || "N/A"}</p>

        <p><strong>👥 Population:</strong>
        ${country.population?.toLocaleString() || "N/A"}</p>

        <p><strong>🌍 Region:</strong>
        ${country.region || "N/A"}</p>

        <p><strong>📐 Area:</strong>
        ${country.area || "N/A"}</p>

        <p><strong>🗣 Language:</strong>
        ${country.languages || "N/A"}</p>

        <p><strong>💰 Currency:</strong>
        ${country.currency || "N/A"}</p>

        <p><strong>📞 Phone:</strong>
        ${country.phone || "N/A"}</p>

    `;

    // Show Bootstrap modal
    const modal = new bootstrap.Modal(
        document.getElementById("countryModal")
    );

    modal.show();

}
