
document.addEventListener('DOMContentLoaded', async () => {
    const apiUrlLaunchpads = 'https://api.spacexdata.com/v4/launchpads/';
    const apiUrlRockets = 'https://api.spacexdata.com/v4/rockets/';

    // nav__left
    const fullNameEl = document.querySelector('.nav__left .description__container:nth-of-type(1) h2');
    const timezoneEl = document.querySelector('.nav__left .description__container:nth-of-type(1) p:nth-of-type(1)');
    const latitudeEl = document.querySelector('.nav__left .description__container:nth-of-type(1) p:nth-of-type(2)');
    const longitudeEl = document.querySelector('.nav__left .description__container:nth-of-type(1) p:nth-of-type(3)');
    const launchAttemptsEl = document.querySelector('.nav__left .description__container:nth-of-type(1) p:nth-of-type(4)');
    const launchSuccessesEl = document.querySelector('.nav__left .description__container:nth-of-type(1) p:nth-of-type(5)');
    const rocketsEl = document.querySelector('.nav__left .description__container:nth-of-type(2) p:nth-of-type(1)');

    // nav__right
    const launchesEl = document.querySelector('.nav__right .information__item p:nth-of-type(1)');

    // carousel
    const nameEl = document.querySelector('.carousel__item:nth-of-type(1)');
    const localityEl = document.querySelector('.carousel__item:nth-of-type(2)');
    const regionEl = document.querySelector('.carousel__item:nth-of-type(3)');
    const statusEl = document.querySelector('.carousel__item:nth-of-type(4)');

    // Flechas para navegar
    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');

    let launchpads = [];
    let currentIndex = 0;

    // Obtener datos de API
    async function fetchData() {
        try {
            const response = await fetch(apiUrlLaunchpads);
            launchpads = await response.json();
            await updateUI();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Se obtienen los nombres de los cohetes
    async function fetchRocketName(rocketId) {
        try {
            const response = await fetch(`${apiUrlRockets}${rocketId}`);
            const rocketData = await response.json();
            return rocketData.name;
        } catch (error) {
            console.error('Error fetching rocket data:', error);
            return null;
        }
    }

    // Función para actualizar la interfaz de usuario con los datos actuales de la plataforma de lanzamiento
    async function updateUI() {
        const currentLaunchpad = launchpads[currentIndex];
        fullNameEl.textContent = `Full Name: ${currentLaunchpad.full_name}`;
        timezoneEl.textContent = `Timezone: ${currentLaunchpad.timezone}`;
        latitudeEl.textContent = `Latitude: ${currentLaunchpad.latitude}`;
        longitudeEl.textContent = `Longitude: ${currentLaunchpad.longitude}`;
        launchAttemptsEl.textContent = `Launch Attempts: ${currentLaunchpad.launch_attempts}`;
        launchSuccessesEl.textContent = `Launch Successes: ${currentLaunchpad.launch_successes}`;
        launchesEl.textContent = `Launches: ${currentLaunchpad.launches.length}`;
        
        if (currentLaunchpad.rockets.length > 0) {
            const rocketNames = await Promise.all(currentLaunchpad.rockets.map(fetchRocketName));
            rocketsEl.textContent = `Rockets: ${rocketNames.filter(name => name).join(', ')}`;
        } else {
            rocketsEl.textContent = `Rockets: 0`;
        }

        nameEl.textContent = `Name: ${currentLaunchpad.name}`;
        localityEl.textContent = `Locality: ${currentLaunchpad.locality}`;
        regionEl.textContent = `Region: ${currentLaunchpad.region}`;
        statusEl.textContent = `Status: ${currentLaunchpad.status}`;
    }

    // Event listeners para las flechas
    leftArrow.addEventListener('click', async () => {
        currentIndex = (currentIndex - 1 + launchpads.length) % launchpads.length;
        await updateUI();
    });

    rightArrow.addEventListener('click', async () => {
        currentIndex = (currentIndex + 1) % launchpads.length;
        await updateUI();
    });

    // Carga el contenido de la pagina
    fetchData();
});