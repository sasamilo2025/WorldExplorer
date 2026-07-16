/*=========================================================
    PHOENIX DETAILS MODAL

    Opens the selected country's details.
=========================================================*/

function openCountryModal(index) {

     console.log("Index received:", index);

    // Get the selected country
    const country = window.lastCountries[index];

    console.log("Country found:", country);

        // Safety check
    if (!country) {
         console.log("No country found!");  
         return;
    }

    // Country name
    document.getElementById("modalCountryName").textContent =
        country.name.common;

    // Flag image
    document.getElementById("modalFlag").src =
        country.flags?.svg || "images/no-flag.jpg";

    // Flag description
    document.getElementById("modalFlag").alt =
        `${country.name.common} Flag`;

// Country details
    console.log(
    "Modal details element:",
    document.getElementById("modalDetails")
    );


/*=========================================================
    LOOK UP NATIONAL ANTHEM

    Retrieves the anthem title from the
    Project Phoenix National Identity database.
=========================================================*/

const anthem = nationalAnthems[country.name.common];
//

/*=========================================================
    NATIONAL IDENTITY

    Region intentionally excluded.

    Earlier API testing showed inconsistent region data
    across countries. To maintain a clean and professional
    user experience, only reliable information is displayed.

    This section is reserved for future enhancements such as:
      • National Anthem
      • National Bird
      • National Flower
      • National Motto
      • Other verified national identity data

    Project Phoenix Version 6.8
=========================================================*/

document.getElementById("modalDetails").innerHTML = `

<div class="details-card">

    <p>
        <strong>🏛 Capital:</strong>
        ${country.capital?.[0] || "N/A"}
    </p>

    <p>
        <strong>👥 Population:</strong>
        ${country.population?.toLocaleString() || "N/A"}
    </p>

    <p>
        <strong>💰 Currency:</strong>
        ${country.currency || "N/A"}
    </p>

    <p>
        <strong>📞 Phone:</strong>
        ${country.phone || "N/A"}
    </p>

</div>

<hr>

<h5>🎵 National Anthem</h5>

<p>
    <em>Currently unavailable.</em>
</p>

<small class="text-muted">
    Project Phoenix is prepared for future
    verified national anthem data.
</small>

`;

    //temporary testing

    console.log(
    "Modal body text:",
    document.getElementById("modalDetails").innerText
);

     // Show Bootstrap modal
     const modal = new bootstrap.Modal(
         document.getElementById("countryModal")
     );

     modal.show();

} 