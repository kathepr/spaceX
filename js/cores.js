document.addEventListener('DOMContentLoaded', function() {
    const coresApiUrl = 'https://api.spacexdata.com/v4/cores/';
    const launchesApiUrl = 'https://api.spacexdata.com/v4/launches/';
    let coresData = [];
    let currentIndex = 0;

    // Función para recuperar datos de la API de cores
    async function fetchCoresData() {
        try {
            const response = await fetch(coresApiUrl);
            const data = await response.json();
            coresData = data;
            displayData();
        } catch (error) {
            console.error('Error fetching cores data:', error);
        }
    }

    // Función para obtener el nombre del lanzamiento de la API de lanzamientos utilizando el ID de lanzamiento
    async function fetchLaunchName(launchId) {
        try {
            const response = await fetch(`${launchesApiUrl}${launchId}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error fetching launch data:', error);
            return 'Unknown Launch';
        }
    }

    // Funcion para mostrar datos en nav__left y carousel_item
    async function displayData() {
        const navLeft = document.querySelector('.nav__left .description__container');
        const carouselItems = document.querySelectorAll('.carousel__item');
        const core = coresData[currentIndex];

        // Obtener los nombres de "launches"
        const launchNames = await Promise.all(core.launches.map(fetchLaunchName));

        navLeft.innerHTML = `
            <h2>Core Information</h2>
            <p>Block: ${core.block}</p>
            <p>Reuses: ${core.reuse_count}</p>
            <p>RTLS Attempts: ${core.rtls_attempts}</p>
            <p>RTLS Landings: ${core.rtls_landings}</p>
            <p>ASDS Attempts: ${core.asds_attempts}</p>
            <p>ASDS Landings: ${core.asds_landings}</p>
            <p>Last Update: ${core.last_update}</p>
            <p>Launches: ${launchNames.join(', ')}</p>
        `;

        carouselItems[0].textContent = `Serial: ${core.serial}`;
        carouselItems[1].textContent = `Status: ${core.status}`;
    }

    // Función para que la flecha derecha funcione de forma circular
    function nextCore() {
        currentIndex = (currentIndex + 1) % coresData.length;
        displayData();
    }

    // Función para que la flecha izquierda funcione de forma circular
    function previousCore() {
        currentIndex = (currentIndex - 1 + coresData.length) % coresData.length;
        displayData();
    }

    // Event listeners para las flechas
    document.getElementById('right_arrow').addEventListener('click', nextCore);
    document.getElementById('left_arrow').addEventListener('click', previousCore);

    // Obtener los datos iniciales
    fetchCoresData();
});
