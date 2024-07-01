document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.spacexdata.com/v4/roadster';
    let imageIndex = 0;
    let roadsterData;

    const updateContent = () => {
        if (roadsterData) {
            // Nav Left
            const navLeftContainers = document.querySelectorAll('.nav__left .description__container');
            navLeftContainers[0].innerHTML = `<h2>Launch Mass (kg)</h2><p>${roadsterData.launch_mass_kg}</p>`;
            navLeftContainers[1].innerHTML = `<h2>Launch Mass (lbs)</h2><p>${roadsterData.launch_mass_lbs}</p>`;
            navLeftContainers[2].innerHTML = `<h2>Epoch JD</h2><p>${roadsterData.epoch_jd}</p>`;
            navLeftContainers[3].innerHTML = `<h2>Orbit Type</h2><p>${roadsterData.orbit_type}</p>`;
            navLeftContainers[4].innerHTML = `<h2>Apoapsis (AU)</h2><p>${roadsterData.apoapsis_au}</p>`;
            navLeftContainers[5].innerHTML = `<h2>Periapsis (AU)</h2><p>${roadsterData.periapsis_au}</p>`;
            navLeftContainers[6].innerHTML = `<h2>Semi-Major Axis (AU)</h2><p>${roadsterData.semi_major_axis_au}</p>`;
            navLeftContainers[7].innerHTML = `<h2>Eccentricity</h2><p>${roadsterData.eccentricity}</p>`;
            navLeftContainers[8].innerHTML = `<h2>Inclination</h2><p>${roadsterData.inclination}</p>`;
            navLeftContainers[9].innerHTML = `<h2>Longitude</h2><p>${roadsterData.longitude}</p>`;

            // Image Crew
            document.getElementById('image_crew').src = roadsterData.flickr_images[imageIndex];

            // Carousel Item
            const carouselItems = document.querySelectorAll('.carousel .carousel__item');
            carouselItems[0].textContent = `Name: ${roadsterData.name}`;
            carouselItems[1].textContent = `Launch Date UTC: ${roadsterData.launch_date_utc}`;

            // Nav Right
            const navRightContainers = document.querySelectorAll('.nav__right .information__item');
            navRightContainers[0].innerHTML = `<h2>Periapsis Argument</h2><p>${roadsterData.periapsis_arg}</p>`;
            navRightContainers[1].innerHTML = `<h2>Period (days)</h2><p>${roadsterData.period_days}</p>`;
            navRightContainers[2].innerHTML = `<h2>Speed (kph)</h2><p>${roadsterData.speed_kph}</p>`;
            navRightContainers[3].innerHTML = `<h2>Speed (mph)</h2><p>${roadsterData.speed_mph}</p>`;
            navRightContainers[4].innerHTML = `<h2>Earth Distance (km)</h2><p>${roadsterData.earth_distance_km}</p>`;
            navRightContainers[5].innerHTML = `<h2>Earth Distance (mi)</h2><p>${roadsterData.earth_distance_mi}</p>`;
            navRightContainers[6].innerHTML = `<h2>Mars Distance (km)</h2><p>${roadsterData.mars_distance_km}</p>`;
            navRightContainers[7].innerHTML = `<h2>Mars Distance (mi)</h2><p>${roadsterData.mars_distance_mi}</p>`;
            navRightContainers[8].innerHTML = `<h2>Details</h2><p>${roadsterData.details}</p>`;
            navRightContainers[9].innerHTML = `<h2>Links</h2><ul>
                <li><a href="${roadsterData.wikipedia}" target="_blank">Wikipedia</a></li>
                <li><a href="${roadsterData.video}" target="_blank">Video</a></li>
            </ul>`;
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            roadsterData = await response.json();
            updateContent();
        } catch (error) {
            console.error('Error fetching the Roadster data:', error);
        }
    };

    document.getElementById('left_arrow').addEventListener('click', () => {
        imageIndex = (imageIndex === 0) ? roadsterData.flickr_images.length - 1 : imageIndex - 1;
        updateContent();
    });

    document.getElementById('right_arrow').addEventListener('click', () => {
        imageIndex = (imageIndex === roadsterData.flickr_images.length - 1) ? 0 : imageIndex + 1;
        updateContent();
    });

    fetchData();
});