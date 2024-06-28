document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.spacexdata.com/v4/company';

    // Selecting elements in nav__left and nav__right
    const navLeft = document.getElementById('nav__left');
    const navRight = document.getElementById('nav__right');
    const carousel = document.getElementById('carousel');
    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');
    const images = document.querySelectorAll('.image__crew__container');
    let currentIndex = 0;

    // Fetch company data from API
    const fetchCompany = async () => {
        try {
            const response = await fetch(apiURL);
            const company = await response.json();
            displayCompany(company);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Display company data
    const displayCompany = (company) => {
        // Display in carousel
        carousel.innerHTML = `
            <div class="carousel__item">Name: ${company.name}</div>
            <div class="carousel__item">Founder: ${company.founder}</div>
            <div class="carousel__item">Founded: ${company.founded}</div>
        `;

        // Display in nav__left
        navLeft.innerHTML = `
            <h2>Headquarters</h2>
            <p>Address: ${company.headquarters.address}, ${company.headquarters.city}, ${company.headquarters.state}</p>
            <h2>Links</h2>
            <ul>
                <li><a href="${company.links.website}" target="_blank">Website</a></li>
                <li><a href="${company.links.flickr}" target="_blank">Flickr</a></li>
                <li><a href="${company.links.twitter}" target="_blank">Twitter</a></li>
                <li><a href="${company.links.elon_twitter}" target="_blank">Elon Musk Twitter</a></li>
            </ul>
        `;

        // Display in nav__right
        navRight.innerHTML = `
            <h2>Company Information</h2>
            <p>Employees: ${company.employees}</p>
            <p>Vehicles: ${company.vehicles}</p>
            <p>Launch Sites: ${company.launch_sites}</p>
            <p>Test Sites: ${company.test_sites}</p>
            <p>CEO: ${company.ceo}</p>
            <p>COO: ${company.coo}</p>
            <p>CTO: ${company.cto}</p>
            <p>CTO Propulsion: ${company.cto_propulsion}</p>
            <p>Valuation: $${company.valuation.toLocaleString()}</p>
            <h2>Summary</h2>
            <p>${company.summary}</p>
        `;

        // Mostrar la primera imagen al cargar la página
        showImage();
    };

    // Función para mostrar la imagen actual
    const showImage = () => {
        images.forEach((image, index) => {
            if (index === currentIndex) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    };

    // Evento para la flecha derecha
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    });

    // Evento para la flecha izquierda
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    });

    // Fetch company information on page load
    fetchCompany();
});