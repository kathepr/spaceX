document.addEventListener('DOMContentLoaded', () => {
    const dragonDetails = document.getElementById('dragonDetails');
    const dragonName = document.getElementById('dragonName');
    const dragonActive = document.getElementById('dragonActive');
    const dragonDescription = document.getElementById('dragonDescription');
    const imageContainer = document.getElementById('image_container');
    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');

    let currentDragonIndex = 0;
    let dragons = [];

    const fetchDragons = () => {
        fetch('https://api.spacexdata.com/v4/dragons')
            .then(response => response.json())
            .then(data => {
                dragons = data;
                updateDragonInfo(currentDragonIndex);
            })
            .catch(error => console.error('Error fetching dragon data:', error));
    };

    const updateDragonInfo = (index) => {
        if (!dragons[index]) {
            console.error('No dragon data available for index:', index);
            return;
        }

        const dragon = dragons[index];

        //nav__right
        dragonDescription.innerHTML = `
            <p><strong>Description:</strong> ${dragon.description}</p>
            <p><strong>Wikipedia:</strong> <a href="${dragon.wikipedia}" target="_blank">${dragon.wikipedia}</a></p>
        `;

        // Carousel
        dragonName.textContent = `Name: ${dragon.name}`;
        dragonActive.textContent = `Active: ${dragon.active ? 'Yes' : 'No'}`;

        // nav__left
        dragonDetails.innerHTML = `
            <p><strong>Sidewall Angle:</strong> ${dragon.sidewall_angle_deg}°</p>
            <p><strong>Orbit Duration:</strong> ${dragon.orbit_duration_yr} years</p>
            <p><strong>Dry Mass:</strong> ${dragon.dry_mass_kg} kg (${dragon.dry_mass_lb} lb)</p>
            <p><strong>Thrusters:</strong></p>
            <ul>${dragon.thrusters.map(thruster => `
                <li>Type: ${thruster.type}, Amount: ${thruster.amount}, Pods: ${thruster.pods}, ISP: ${thruster.isp}, Thrust: ${thruster.thrust.kN} kN (${thruster.thrust.lbf} lbf), Fuel: ${thruster.fuel_1} + ${thruster.fuel_2}</li>
            `).join('')}</ul>
            <p><strong>Heat Shield:</strong> Material: ${dragon.heat_shield.material}, Size: ${dragon.heat_shield.size_meters} meters, Temp: ${dragon.heat_shield.temp_degrees}°C, Dev Partner: ${dragon.heat_shield.dev_partner}</p>
            <p><strong>Launch Payload Mass:</strong> ${dragon.launch_payload_mass.kg} kg (${dragon.launch_payload_mass.lb} lb)</p>
            <p><strong>Launch Payload Volume:</strong> ${dragon.launch_payload_vol.cubic_meters} m³ (${dragon.launch_payload_vol.cubic_feet} ft³)</p>
            <p><strong>Return Payload Mass:</strong> ${dragon.return_payload_mass.kg} kg (${dragon.return_payload_mass.lb} lb)</p>
            <p><strong>Return Payload Volume:</strong> ${dragon.return_payload_vol.cubic_meters} m³ (${dragon.return_payload_vol.cubic_feet} ft³)</p>
            <p><strong>Pressurized Capsule Payload Volume:</strong> ${dragon.pressurized_capsule.payload_volume.cubic_meters} m³ (${dragon.pressurized_capsule.payload_volume.cubic_feet} ft³)</p>
            <p><strong>Trunk Volume:</strong> ${dragon.trunk.trunk_volume.cubic_meters} m³ (${dragon.trunk.trunk_volume.cubic_feet} ft³)</p>
            <p><strong>Trunk Cargo:</strong> Solar Arrays: ${dragon.trunk.cargo.solar_array}, Unpressurized Cargo: ${dragon.trunk.cargo.unpressurized_cargo ? 'Yes' : 'No'}</p>
            <p><strong>Height with Trunk:</strong> ${dragon.height_w_trunk.meters} meters (${dragon.height_w_trunk.feet} feet)</p>
            <p><strong>Diameter:</strong> ${dragon.diameter.meters} meters (${dragon.diameter.feet} feet)</p>
            <p><strong>First Flight:</strong> ${dragon.first_flight}</p>
        `;

        // LImpiar las imagenes previas
        imageContainer.innerHTML = '';
        dragon.flickr_images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.classList.add('image__crew');
            img.setAttribute('referrerpolicy', 'no-referrer');
            imageContainer.appendChild(img);
        });
    };

    // Event listeners para navegar con las flechas
    leftArrow.addEventListener('click', () => {
        currentDragonIndex = (currentDragonIndex > 0) ? currentDragonIndex - 1 : dragons.length - 1;
        updateDragonInfo(currentDragonIndex);
    });
    
    rightArrow.addEventListener('click', () => {
        currentDragonIndex = (currentDragonIndex < dragons.length - 1) ? currentDragonIndex + 1 : 0;
        updateDragonInfo(currentDragonIndex);
    });

    // Obtener los datos iniciales
    fetchDragons();
});
