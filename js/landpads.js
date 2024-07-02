// Función para obtener el nombre del lanzamiento por ID
async function getLaunchName(launchId) {
    const response = await fetch(`https://api.spacexdata.com/v4/launches/${launchId}`);
    const launchData = await response.json();
    return launchData.name;
}

// Función principal para obtener y mostrar información de Landpads
async function fetchLandpadData() {
    const response = await fetch('https://api.spacexdata.com/v4/landpads');
    const landpads = await response.json();
    
    let currentIndex = 0;
    const totalLandpads = landpads.length;
    
    const navLeft = document.querySelector('.nav__left');
    const carousel = document.querySelector('.carousel');
    const navRight = document.querySelector('.nav__right');

    function updateContent() {
        const landpad = landpads[currentIndex];

        // Actualiza la información en nav__left
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(2)').textContent = `Nombre completo: ${landpad.full_name}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(3)').textContent = `Tipo: ${landpad.type}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(4)').textContent = `Localidad: ${landpad.locality}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(5)').textContent = `Región: ${landpad.region}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(6)').textContent = `Latitud: ${landpad.latitude}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(7)').textContent = `Longitud: ${landpad.longitude}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(8)').textContent = `Intentos de aterrizaje: ${landpad.landing_attempts}`;
        navLeft.querySelector('.description__container:nth-child(1) p:nth-child(9)').textContent = `Éxitos de aterrizaje: ${landpad.landing_successes}`;

        // Actualiza la información en carousel
        carousel.querySelector('.carousel__item:nth-child(1)').textContent = `Nombre: ${landpad.name}`;
        carousel.querySelector('.carousel__item:nth-child(2)').textContent = `Estado: ${landpad.status}`;
        carousel.querySelector('.carousel__item:nth-child(3)').textContent = `Localidad: ${landpad.locality}`;
        carousel.querySelector('.carousel__item:nth-child(4)').textContent = `Región: ${landpad.region}`;

        // Actualiza la información en nav__right
        navRight.querySelector('.information__item p:nth-child(2)').textContent = `Detalles: ${landpad.details}`;
        const linkElement = navRight.querySelector('.information__item a');
        linkElement.href = landpad.wikipedia;
        linkElement.textContent = "Detalles del Landpad";

        // Actualiza launches
        const launchesList = document.getElementById('launches');
        launchesList.innerHTML = ''; // Limpia los lanzamientos anteriores
        landpad.launches.forEach(async launchId => {
            const launchName = await getLaunchName(launchId);
            const listItem = document.createElement('li');
            listItem.textContent = launchName;
            launchesList.appendChild(listItem);
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % totalLandpads;
        updateContent();
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + totalLandpads) % totalLandpads;
        updateContent();
    }

    document.getElementById('right_arrow').addEventListener('click', showNext);
    document.getElementById('left_arrow').addEventListener('click', showPrevious);

    // Inicializa el contenido con el primer landpad
    updateContent();
}

document.addEventListener('DOMContentLoaded', fetchLandpadData);
