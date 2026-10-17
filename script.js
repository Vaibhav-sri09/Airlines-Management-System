function deleteRow(button) {
    if (confirm("Are you sure you want to delete this sample record?")) {
        button.parentElement.parentElement.remove();
    }
}
function calculateFuelCost() {
    var qty = document.getElementById("fuel-qty").value;
    var price = document.getElementById("fuel-price").value;
    var total = qty * price;
    var totalField = document.getElementById("fuel-total");
    var preview = document.getElementById("fuel-calc-preview");

    if (totalField) totalField.value = total > 0 ? total.toFixed(2) : "";
    if (preview) preview.textContent = total > 0 ? "₹ " + total.toFixed(2) : "₹ 0.00";
}

function handleArrivalForm(event) {
    event.preventDefault();
    var flightNo = document.getElementById("arr-flight-no").value;
    var airline = document.getElementById("arr-airline").value;
    var origin = document.getElementById("arr-origin").value;
    var time = document.getElementById("arr-time").value;
    var gate = document.getElementById("arr-gate").value;
    var status = document.getElementById("arr-status").value;

    if (!flightNo || !airline || !origin || !time || !gate) {
        alert("Please fill in all required fields.");
        return;
    }

    var badge = status === "Delayed" ? "badge-yellow" : (status === "Landed" ? "badge-grey" : "badge-green");
    var table = document.querySelector("#arrivals-table tbody");
    var row = table.insertRow();
    row.innerHTML = "<td><strong>" + flightNo + "</strong></td><td>" + airline + "</td><td>" + origin + "</td><td>" + time.replace("T", " ") + "</td><td>" + gate + "</td><td><span class='badge " + badge + "'>" + status + "</span></td><td><button type='button' class='btn-delete' onclick='deleteRow(this)'>Delete</button></td>";
    
    event.target.reset();
    alert("Arrival record added to the table.");
}

function handleDepartureForm(event) {
    event.preventDefault();
    var flightNo = document.getElementById("dep-flight-no").value;
    var airline = document.getElementById("dep-airline").value;
    var destination = document.getElementById("dep-destination").value;
    var time = document.getElementById("dep-time").value;
    var gate = document.getElementById("dep-gate").value;
    var status = document.getElementById("dep-status").value;

    if (!flightNo || !airline || !destination || !time || !gate) {
        alert("Please fill in all required fields.");
        return;
    }

    var badge = status === "Delayed" ? "badge-yellow" : (status === "Boarding" ? "badge-blue" : (status === "Departed" ? "badge-grey" : "badge-green"));
    var table = document.querySelector("#departures-table tbody");
    var row = table.insertRow();
    row.innerHTML = "<td><strong>" + flightNo + "</strong></td><td>" + airline + "</td><td>" + destination + "</td><td>" + time.replace("T", " ") + "</td><td>" + gate + "</td><td><span class='badge " + badge + "'>" + status + "</span></td><td><button type='button' class='btn-delete' onclick='deleteRow(this)'>Delete</button></td>";
    
    event.target.reset();
    alert("Departure record added to the table.");
}

function handleFuelForm(event) {
    event.preventDefault();
    var id = document.getElementById("fuel-id").value;
    var flightNo = document.getElementById("fuel-flight-no").value;
    var qty = document.getElementById("fuel-qty").value;
    var price = document.getElementById("fuel-price").value;
    var total = document.getElementById("fuel-total").value;
    var date = document.getElementById("fuel-date").value;

    if (!id || !flightNo || !qty || !price || !total || !date) {
        alert("Please fill in all fuel fields.");
        return;
    }

    var table = document.querySelector("#jetfuel-table tbody");
    var row = table.insertRow();
    row.innerHTML = "<td><strong>" + id + "</strong></td><td>" + flightNo + "</td><td>" + qty + " L</td><td>₹" + price + "</td><td><strong>₹" + total + "</strong></td><td>" + date.replace("T", " ") + "</td><td><button type='button' class='btn-delete' onclick='deleteRow(this)'>Delete</button></td>";
    
    event.target.reset();
    var preview = document.getElementById("fuel-calc-preview");
    if (preview) preview.textContent = "₹ 0.00";
    alert("Fuel record added to the table.");
}

function handleMaintenanceForm(event) {
    event.preventDefault();
    var id = document.getElementById("maint-id").value;
    var runway = document.getElementById("maint-runway").value;
    var date = document.getElementById("maint-date").value;
    var status = document.getElementById("maint-status").value;

    if (!id || !runway || !date || !status) {
        alert("Please fill in all maintenance fields.");
        return;
    }

    var badge = status === "In Progress" ? "badge-yellow" : (status === "Completed" ? "badge-green" : "badge-blue");
    var table = document.querySelector("#maintenance-table tbody");
    var row = table.insertRow();
    row.innerHTML = "<td><strong>" + id + "</strong></td><td>" + runway + "</td><td>" + date + "</td><td><span class='badge " + badge + "'>" + status + "</span></td><td><button type='button' class='btn-delete' onclick='deleteRow(this)'>Delete</button></td>";
    
    event.target.reset();
    alert("Maintenance record added to the table.");
}

function handlePassengerForm(event) {
    event.preventDefault();
    var id = document.getElementById("pax-id").value;
    var name = document.getElementById("pax-name").value;
    var gender = document.getElementById("pax-gender").value;
    var flight = document.getElementById("pax-flight").value;
    var age = document.getElementById("pax-age").value;
    var nationality = document.getElementById("pax-nationality").value;

    if (!id || !name || !gender || !flight || !age || !nationality) {
        alert("Please fill in all passenger fields.");
        return;
    }

    var table = document.querySelector("#passengers-table tbody");
    var row = table.insertRow();
    row.innerHTML = "<td><strong>" + id + "</strong></td><td>" + name + "</td><td>" + gender + "</td><td>" + flight + "</td><td>" + age + "</td><td>" + nationality + "</td><td><button type='button' class='btn-delete' onclick='deleteRow(this)'>Delete</button></td>";
    
    event.target.reset();
    alert("Passenger record added to the table.");
}

window.onload = function() {
    var arr = document.getElementById("arrivals-form");
    if (arr) arr.onsubmit = handleArrivalForm;

    var dep = document.getElementById("departures-form");
    if (dep) dep.onsubmit = handleDepartureForm;

    var fuel = document.getElementById("jetfuel-form");
    if (fuel) fuel.onsubmit = handleFuelForm;

    var maint = document.getElementById("maintenance-form");
    if (maint) maint.onsubmit = handleMaintenanceForm;

    var pax = document.getElementById("passengers-form");
    if (pax) pax.onsubmit = handlePassengerForm;

    var qty = document.getElementById("fuel-qty");
    var price = document.getElementById("fuel-price");
    
    if (qty) qty.oninput = calculateFuelCost;
    if (price) price.oninput = calculateFuelCost;
};
