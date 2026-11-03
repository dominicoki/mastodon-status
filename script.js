async function loadStatus() {
    const response = await fetch("status.json");
    const data = await response.json();

    document.getElementById("updated").textContent =
        new Date(data.lastUpdated).toLocaleString();

    const services = document.getElementById("services");
    services.innerHTML = "";

    data.services.forEach(service => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.status}</td>
        `;

        services.appendChild(row);
    });
}

loadStatus();
