document.addEventListener("DOMContentLoaded", async () => {
    const payloadsResponse = await fetch("https://api.spacexdata.com/v4/payloads/");
    const payloads = await payloadsResponse.json();

    let currentIndex = 0;

    const replaceBoolean = (value) => {
        return value === true ? "Yes" : value === false ? "No" : null;
    };

    const fetchLaunchName = async (launchId) => {
        const launchResponse = await fetch(`https://api.spacexdata.com/v4/launches/${launchId}`);
        const launch = await launchResponse.json();
        return launch.name;
    };

    const fetchCapsuleType = async (capsuleId) => {
        if (!capsuleId) return null;
        const capsuleResponse = await fetch(`https://api.spacexdata.com/v4/capsules/${capsuleId}`);
        const capsule = await capsuleResponse.json();
        return capsule.type;
    };

    const updateContent = async (index) => {
        const payload = payloads[index];
        const launchName = await fetchLaunchName(payload.launch);
        const capsuleType = await fetchCapsuleType(payload.dragon.capsule);

        // Update nav__left
        const navLeft = document.querySelector("nav.nav__left .description__container");
        navLeft.innerHTML = `
            <h2>Dragon Information</h2>
            ${capsuleType ? `<p>Capsule Type: ${capsuleType}</p>` : ""}
            ${payload.dragon.mass_returned_kg ? `<p>Mass Returned (kg): ${payload.dragon.mass_returned_kg}</p>` : ""}
            ${payload.dragon.mass_returned_lbs ? `<p>Mass Returned (lbs): ${payload.dragon.mass_returned_lbs}</p>` : ""}
            ${payload.dragon.flight_time_sec ? `<p>Flight Time (sec): ${payload.dragon.flight_time_sec}</p>` : ""}
            ${payload.dragon.manifest ? `<p>Manifest: ${payload.dragon.manifest}</p>` : ""}
            ${payload.dragon.water_landing !== null ? `<p>Water Landing: ${replaceBoolean(payload.dragon.water_landing)}</p>` : ""}
            ${payload.dragon.land_landing !== null ? `<p>Land Landing: ${replaceBoolean(payload.dragon.land_landing)}</p>` : ""}
            ${payload.customers.length ? `<p>Customers: ${payload.customers.join(", ")}</p>` : ""}
            ${payload.nationalities.length ? `<p>Nationalities: ${payload.nationalities.join(", ")}</p>` : ""}
            ${payload.manufacturers.length ? `<p>Manufacturers: ${payload.manufacturers.join(", ")}</p>` : ""}
        `;

        // Update carousel
        const carousel = document.querySelector(".carousel");
        carousel.innerHTML = `
            <div class="carousel__item">Name: ${payload.name}</div>
            <div class="carousel__item">Type: ${payload.type}</div>
            <div class="carousel__item">Reused: ${replaceBoolean(payload.reused)}</div>
            <div class="carousel__item">Launch: ${launchName}</div>
        `;

        // Update nav__right
        const navRight = document.querySelector("nav.nav__right .information__item");
        navRight.innerHTML = `
            <h2>Payload Information</h2>
            ${payload.mass_kg ? `<p>Mass (kg): ${payload.mass_kg}</p>` : ""}
            ${payload.mass_lbs ? `<p>Mass (lbs): ${payload.mass_lbs}</p>` : ""}
            ${payload.orbit ? `<p>Orbit: ${payload.orbit}</p>` : ""}
            ${payload.reference_system ? `<p>Reference System: ${payload.reference_system}</p>` : ""}
            ${payload.regime ? `<p>Regime: ${payload.regime}</p>` : ""}
            ${payload.longitude ? `<p>Longitude: ${payload.longitude}</p>` : ""}
            ${payload.semi_major_axis_km ? `<p>Semi-Major Axis (km): ${payload.semi_major_axis_km}</p>` : ""}
            ${payload.eccentricity ? `<p>Eccentricity: ${payload.eccentricity}</p>` : ""}
            ${payload.periapsis_km ? `<p>Periapsis (km): ${payload.periapsis_km}</p>` : ""}
            ${payload.apoapsis_km ? `<p>Apoapsis (km): ${payload.apoapsis_km}</p>` : ""}
            ${payload.inclination_deg ? `<p>Inclination (deg): ${payload.inclination_deg}</p>` : ""}
            ${payload.period_min ? `<p>Period (min): ${payload.period_min}</p>` : ""}
            ${payload.lifespan_years ? `<p>Lifespan (years): ${payload.lifespan_years}</p>` : ""}
            ${payload.epoch ? `<p>Epoch: ${payload.epoch}</p>` : ""}
            ${payload.mean_motion ? `<p>Mean Motion: ${payload.mean_motion}</p>` : ""}
            ${payload.raan ? `<p>RAAN: ${payload.raan}</p>` : ""}
            ${payload.arg_of_pericenter ? `<p>Argument of Pericenter: ${payload.arg_of_pericenter}</p>` : ""}
            ${payload.mean_anomaly ? `<p>Mean Anomaly: ${payload.mean_anomaly}</p>` : ""}
        `;
    };

    const showNextPayload = () => {
        currentIndex = (currentIndex + 1) % payloads.length;
        updateContent(currentIndex);
    };

    const showPreviousPayload = () => {
        currentIndex = (currentIndex - 1 + payloads.length) % payloads.length;
        updateContent(currentIndex);
    };

    document.getElementById("right_arrow").addEventListener("click", showNextPayload);
    document.getElementById("left_arrow").addEventListener("click", showPreviousPayload);

    // Initial content load
    updateContent(currentIndex);
});