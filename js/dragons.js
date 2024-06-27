document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.spacexdata.com/v4/dragons';
    let dragons = [];
    let currentIndex = 0;

    const dragonName = document.getElementById('dragonName');
    const dragonType = document.getElementById('dragonType');
    const dragonActive = document.getElementById('dragonActive');
    const dragonDetails = document.getElementById('dragonDetails');
    const dragonImage = document.getElementById('image_crew');
    const dragonDescription = document.getElementById('dragonDescription');
    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');

    // Fetch dragons data from API
    const fetchDragons = async () => {
        try {
            const response = await fetch(apiURL);
            dragons = await response.json();
            displayDragon(currentIndex);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Display dragon data
    const displayDragon = (index) => {
        const dragon = dragons[index];
        dragonName.textContent = `Name: ${dragon.name}`;
        dragonType.textContent = `Type: ${dragon.type}`;
        dragonActive.textContent = `Active: ${dragon.active}`;
        dragonDetails.innerHTML = `
            <h2>Details</h2>
            <p>Crew Capacity: ${dragon.crew_capacity}</p>
            <p>Sidewall angle: ${dragon.sidewall_angle_deg}</p>
            <p>Orbit Duration (year): ${dragon.orbit_duration_yr}</p>
            <div class="container__weight">
                <img src="../storage/image/weight.png">
                <p>Dry mass (kg): ${dragon.dry_mass_kg}</p>
                <p>||</p>
                <p>Dry mass (lb): ${dragon.dry_mass_lb}</p>
            </div>
            <h2>Thrusters:</h2>
            ${dragon.thrusters.map((thruster, index) => `
                <div class="thruster">
                    <h3>Thruster ${index + 1}</h3>
                    <p>Type: ${thruster.type}</p>
                    <p>Amount: ${thruster.amount}</p>
                    <p>Pods: ${thruster.pods}</p>
                    <p>Fuel: ${thruster.fuel_1}, ${thruster.fuel_2}</p>
                    <p>Specific Impulse (isp): ${thruster.isp}</p>
                    <p>Kilonewtons(kN): ${thruster.thrust.kN}</p>
                    <p>Pounds-force(lbf): ${thruster.thrust.lbf}</p>
                </div>
            `).join('')}
            <h2>Heat Shield</h2>
            <p>Material: ${dragon.heat_shield.material}</p>
            <p>Size (meters): ${dragon.heat_shield.size_meters}</p>
            <p>Development Partner: ${dragon.heat_shield.dev_partner}</p>
            <h2>Launch Payload Mass</h2>
            <p>Kg: ${dragon.launch_payload_mass.kg}</p>
            <p>Lb: ${dragon.launch_payload_mass.lb}</p>
            <h2>Return Payload Mass</h2>
            <p>Kg: ${dragon.return_payload_mass.kg}</p>
            <p>Lb: ${dragon.return_payload_mass.lb}</p>
            <h2>Return Payload Volume</h2>
            <p>Cubic Meters: ${dragon.return_payload_vol.cubic_meters}</p>
            <p>Cubic Feet: ${dragon.return_payload_vol.cubic_feet}</p>
            <h2>Pressurized Capsule</h2>
            <p>Payload Volume</p>
            <p>Cubic Meters: ${dragon.pressurized_capsule.payload_volume.cubic_meters}</p>
            <p>Cubic Feet: ${dragon.pressurized_capsule.payload_volume.cubic_feet}</p>
            <h2>Trunk</h2>
            <p>Trunk Volume</p>
            <p>Cubic Meters: ${dragon.trunk.trunk_volume.cubic_meters}</p>
            <p>Cubic Feet: ${dragon.trunk.trunk_volume.cubic_feet}</p>
            <p>Cargo</p>
            <p>Solar Array: ${dragon.trunk.cargo.solar_array}</p>
            <p>Unpressurized Cargo: ${dragon.trunk.cargo.unpressurized_cargo}</p>
            <h2>Height with Trunk</h2>
            <p>Meters: ${dragon.height_w_trunk.meters}</p>
            <p>Feet: ${dragon.height_w_trunk.feet}</p>
            <h2>Diameter</h2>
            <p>Meters: ${dragon.diameter.meters}</p>
            <p>Feet: ${dragon.diameter.feet}</p>
        `;
        dragonImage.src = dragon.flickr_images[0];
        dragonDescription.innerHTML = `
            <h2>Description</h2>
            <p>${dragon.description}</p>
        `;
    };

    // Event listeners for navigation
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayDragon(currentIndex);
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < dragons.length - 1) {
            currentIndex++;
            displayDragon(currentIndex);
        }
    });

    // Initial fetch
    fetchDragons();
});