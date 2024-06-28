document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'https://api.spacexdata.com/v4/ships/';
    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');
    const shipName = document.querySelector('.carousel__item:nth-child(1)');
    const shipPort = document.querySelector('.carousel__item:nth-child(2)');
    const shipYear = document.querySelector('.carousel__item:nth-child(3)');
    const shipImage = document.getElementById('image_crew');
    const shipDetails = document.querySelector('.information__item');

    // Elements for nav__left
    const imoNumber = document.querySelector('.description__container p:nth-child(2)');
    const mmsiNumber = document.querySelector('.description__container p:nth-child(3)');
    const absNumber = document.querySelector('.description__container p:nth-child(4)');
    const shipClass = document.querySelector('.description__container p:nth-child(5)');
    const massKg = document.querySelector('.description__container p:nth-child(6)');
    const massLb = document.querySelector('.description__container p:nth-child(7)');

    let ships = [];
    let currentIndex = 0;

    // Fetch ship data from the API
    try {
        const response = await fetch(API_URL);
        ships = await response.json();
        updateShipInfo(ships[currentIndex]);
    } catch (error) {
        console.error('Error fetching ships data:', error);
    }

    // Event listener for the left arrow click
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? ships.length - 1 : currentIndex - 1;
        updateShipInfo(ships[currentIndex]);
    });

    // Event listener for the right arrow click
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === ships.length - 1) ? 0 : currentIndex + 1;
        updateShipInfo(ships[currentIndex]);
    });

    // Function to update ship information
    function updateShipInfo(ship) {
        shipName.textContent = `Name: ${ship.name}`;
        shipPort.textContent = `Home Port: ${ship.home_port}`;
        shipYear.textContent = `Year: ${ship.year_built || 'Unknown'}`;
        shipImage.src = ship.image || 'https://via.placeholder.com/400';

        imoNumber.textContent = `International Maritime Organization Number(IMO): ${ship.imo || 'Unknown'}`;
        mmsiNumber.textContent = `Maritime Mobile Service Identity: ${ship.mmsi || 'Unknown'}`;
        absNumber.textContent = `American Bureau of Shipping (ABS): ${ship.abs || 'Unknown'}`;
        shipClass.textContent = `Ship class: ${ship.class || 'Unknown'}`;
        massKg.textContent = `Mass(kg): ${ship.mass_kg || 'Unknown'}`;
        massLb.textContent = `Mass(lb): ${ship.mass_lbs || 'Unknown'}`;

        shipDetails.innerHTML = `
            <h2>Details:</h2>
            <p>Type: ${ship.type || 'Unknown'}</p>
            <p>Roles: ${ship.roles.join(', ')}</p>
            <p>Active: ${ship.active ? 'Yes' : 'No'}</p>
            <p>Launches: ${ship.launches.length}</p>
            <h2>Links</h2>
            <ul>
                <li><a href="${ship.link}" target="_blank">Ship Details</a></li>
            </ul>
        `;
    }
});