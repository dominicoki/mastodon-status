async function loadStatus() {

    const response = await fetch(
        "status.json?t=" + Date.now()
    );

    const data = await response.json();

    const banner = document.getElementById("banner");

    if (data.overall === "operational") {

        banner.className = "banner operational";
        banner.textContent =
            "✅ All Systems Operational";

    } else {

        banner.className = "banner outage";
        banner.textContent =
            "🚨 Service Disruption Detected";
    }

    document.getElementById("updated").textContent =
        new Date(data.lastUpdated).toLocaleString();

    const services =
        document.getElementById("services");

    services.innerHTML = "";

    data.services.forEach(service => {

        const row =
            document.createElement("tr");

        const icon =
            service.status === "operational"
            ? "🟢"
            : "🔴";

        row.innerHTML = `
            <td>${service.name}</td>
            <td>
                ${icon}
                ${service.status}
            </td>
        `;

        services.appendChild(row);
    });
}

loadStatus();

setInterval(loadStatus, 60000);
