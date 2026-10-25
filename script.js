function deleteRow(button) {
    if (confirm("Are you sure you want to delete this record?")) {
        button.parentElement.parentElement.remove();
    }
}

function escapeText(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function addRow(tableSelector, html) {
    var row = document.querySelector(tableSelector + " tbody").insertRow();
    row.innerHTML = html + '<td><button type="button" class="btn-delete" onclick="deleteRow(this)">Delete</button></td>';
}

function getBadge(status) {
    var map = { "Delayed": "badge-yellow", "In Progress": "badge-yellow", "Boarding": "badge-blue", "Scheduled": "badge-blue", "Landed": "badge-grey", "Departed": "badge-grey" };
    return map[status] || "badge-green";
}

function calculateFuelCost() {
    var qty = val("fuel-qty");
    var price = val("fuel-price");
    var total = qty * price;
    var totalField = document.getElementById("fuel-total");
    var preview = document.getElementById("fuel-calc-preview");

    if (totalField) totalField.value = total > 0 ? total.toFixed(2) : "";
    if (preview) preview.textContent = total > 0 ? "₹ " + total.toFixed(2) : "₹ 0.00";
}

function handleArrivalForm(event) {
    event.preventDefault();
    var flightNo = val("arr-flight-no"), airline = val("arr-airline"), origin = val("arr-origin"), time = val("arr-time"), gate = val("arr-gate"), status = val("arr-status");
    if (!flightNo || !airline || !origin || !time || !gate) return alert("Please fill in all required fields.");
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) return alert("Please enter arrival time in YYYY-MM-DD HH:MM:SS format.");

    addRow("#arrivals-table", `<td><strong>${escapeText(flightNo)}</strong></td><td>${escapeText(airline)}</td><td>${escapeText(origin)}</td><td>${escapeText(time)}</td><td>${escapeText(gate)}</td><td><span class="badge ${getBadge(status)}">${status}</span></td>`);
    event.target.reset();
    alert("Arrival record added to the table.");
}

function handleDepartureForm(event) {
    event.preventDefault();
    var flightNo = val("dep-flight-no"), airline = val("dep-airline"), destination = val("dep-destination"), time = val("dep-time"), gate = val("dep-gate"), status = val("dep-status");
    if (!flightNo || !airline || !destination || !time || !gate) return alert("Please fill in all required fields.");
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) return alert("Please enter departure time in YYYY-MM-DD HH:MM:SS format.");

    addRow("#departures-table", `<td><strong>${escapeText(flightNo)}</strong></td><td>${escapeText(airline)}</td><td>${escapeText(destination)}</td><td>${escapeText(time)}</td><td>${escapeText(gate)}</td><td><span class="badge ${getBadge(status)}">${status}</span></td>`);
    event.target.reset();
    alert("Departure record added to the table.");
}

function handleFuelForm(event) {
    event.preventDefault();
    var id = val("fuel-id"), flightNo = val("fuel-flight-no"), qty = val("fuel-qty"), price = val("fuel-price"), total = val("fuel-total"), date = val("fuel-date");
    if (!id || !flightNo || !qty || !price || !total || !date) return alert("Please fill in all fuel fields.");
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) return alert("Please enter fueling time in YYYY-MM-DD HH:MM:SS format.");

    addRow("#jetfuel-table", `<td><strong>${escapeText(id)}</strong></td><td>${escapeText(flightNo)}</td><td>${qty} L</td><td>₹${price}</td><td><strong>₹${total}</strong></td><td>${escapeText(date)}</td>`);
    event.target.reset();
    var preview = document.getElementById("fuel-calc-preview");
    if (preview) preview.textContent = "₹ 0.00";
    alert("Fuel record added to the table.");
}

function handleMaintenanceForm(event) {
    event.preventDefault();
    var id = val("maint-id"), runway = val("maint-runway"), date = val("maint-date"), status = val("maint-status");
    if (!id || !runway || !date || !status) return alert("Please fill in all maintenance fields.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return alert("Please enter maintenance date in YYYY-MM-DD format.");

    addRow("#maintenance-table", `<td><strong>${escapeText(id)}</strong></td><td>${runway}</td><td>${escapeText(date)}</td><td><span class="badge ${getBadge(status)}">${status}</span></td>`);
    event.target.reset();
    alert("Maintenance record added to the table.");
}

function handlePassengerForm(event) {
    event.preventDefault();
    var id = val("pax-id"), name = val("pax-name"), gender = val("pax-gender"), flight = val("pax-flight"), age = val("pax-age"), nationality = val("pax-nationality");
    if (!id || !name || !gender || !flight || !age || !nationality) return alert("Please fill in all passenger fields.");

    addRow("#passengers-table", `<td><strong>${escapeText(id)}</strong></td><td>${escapeText(name)}</td><td>${gender}</td><td>${escapeText(flight)}</td><td>${age}</td><td>${escapeText(nationality)}</td>`);
    event.target.reset();
    alert("Passenger record added to the table.");
}

window.onload = function() {
    var forms = {
        "arrivals-form": handleArrivalForm,
        "departures-form": handleDepartureForm,
        "jetfuel-form": handleFuelForm,
        "maintenance-form": handleMaintenanceForm,
        "passengers-form": handlePassengerForm
    };
    for (var formId in forms) {
        var formEl = document.getElementById(formId);
        if (formEl) formEl.onsubmit = forms[formId];
    }

    var qty = document.getElementById("fuel-qty");
    var price = document.getElementById("fuel-price");
    if (qty) qty.oninput = calculateFuelCost;
    if (price) price.oninput = calculateFuelCost;
};
