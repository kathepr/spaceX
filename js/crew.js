document.addEventListener('DOMContentLoaded', () => {
    const crewEndpoint = 'https://api.spacexdata.com/v4/crew';
    let crewData = [];
    let currentIndex = 0;

    const nameElement = document.querySelector('.carousel__item:nth-child(1)');
    const agencyElement = document.querySelector('.carousel__item:nth-child(2)');
    const launchesElement = document.querySelector('.carousel__item:nth-child(3)');
    const statusElement = document.querySelector('.carousel__item:nth-child(4)');
    const imageElement = document.querySelector('.image__crew');

    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');

    // Función asíncrona para obtener información de la API
    async function fetchCrewData() {
        try {
            const response = await fetch(crewEndpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            crewData = await response.json();
            displayCrewMember(currentIndex);
        } catch (error) {
            console.error('Error al obtener datos de la tripulación:', error);
        }
    }

    // Se muestran datos de los miembros de la tripulación
    function displayCrewMember(index) {
        if (crewData.length === 0) return;
        const member = crewData[index];
        nameElement.textContent = `Name: ${member.name}`;
        agencyElement.textContent = `Agency: ${member.agency}`;
        launchesElement.textContent = `Launches: ${member.launches.length}`;
        statusElement.textContent = `Status: ${member.status}`;
        imageElement.src = member.image;
    }

    // Event listeners para la navegación con las flechas
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : crewData.length - 1;
        displayCrewMember(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < crewData.length - 1) ? currentIndex + 1 : 0;
        displayCrewMember(currentIndex);
    });

    // Llamar a la función fetchCrewData
    fetchCrewData();
});