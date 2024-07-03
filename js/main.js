document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://api.spacexdata.com/v4/launches/';
    const response = await fetch(apiUrl);
    const launches = await response.json();

    let currentLaunchIndex = 0;
    let currentImageIndex = 0;

    const updateContent = (index) => {
        const launch = launches[index];

        // Links
        const linksElement = document.getElementById('links');
        if (launch.links.presskit) {
            linksElement.innerHTML = `
                <li><a href="${launch.links.presskit}" target="_blank">Presskit</a></li>
            `;
        } else {
            linksElement.innerHTML = '';
        }

        // Reddit Links
        const redditLinksElement = document.getElementById('reddit-links');
        if (launch.links.reddit) {
            let redditLinks = '';
            if (launch.links.reddit.campaign) {
                redditLinks += `<li><a href="${launch.links.reddit.campaign}" target="_blank">Campaign</a></li>`;
            }
            if (launch.links.reddit.launch) {
                redditLinks += `<li><a href="${launch.links.reddit.launch}" target="_blank">Launch</a></li>`;
            }
            if (launch.links.reddit.media) {
                redditLinks += `<li><a href="${launch.links.reddit.media}" target="_blank">Media</a></li>`;
            }
            redditLinksElement.innerHTML = redditLinks;
        } else {
            redditLinksElement.innerHTML = '';
        }

        // Details
        const detailsElement = document.getElementById('details');
        if (launch.details) {
            detailsElement.textContent = `Details: ${launch.details}`;
        } else {
            detailsElement.textContent = '';
        }

        // Static Fire Date
        const staticFireDateElement = document.getElementById('static-fire-date');
        if (launch.static_fire_date_utc) {
            staticFireDateElement.textContent = `Static Fire Date: ${launch.static_fire_date_utc}`;
        } else {
            staticFireDateElement.textContent = '';
        }

        // Rocket
        const rocketElement = document.getElementById('rocket');
        if (launch.rocket) {
            rocketElement.textContent = `Rocket: ${launch.rocket}`;
        } else {
            rocketElement.textContent = '';
        }
     
       



        // Success
        const successElement = document.getElementById('success');
        if (launch.success !== null) {
            successElement.textContent = `Success: ${launch.success ? 'Yes' : 'No'}`;
        } else {
            successElement.textContent = '';
        }

        // Carousel Information
        const nameElement = document.getElementById('name');
        if (launch.name) {
            nameElement.textContent = `Name: ${launch.name}`;
        } else {
            nameElement.textContent = '';
        }

        const flightNumberElement = document.getElementById('flight-number');
        if (launch.flight_number) {
            flightNumberElement.textContent = `Flight Number: ${launch.flight_number}`;
        } else {
            flightNumberElement.textContent = '';
        }

        // Date (UTC)
        const dateUtcElement = document.getElementById('date-utc');
        if (launch.date_utc) {
            dateUtcElement.textContent = `Date (UTC): ${launch.date_utc}`;
        } else {
            dateUtcElement.textContent = '';
        }

        // Date (Local)
        const dateLocalElement = document.getElementById('date-local');
        if (launch.date_local) {
            dateLocalElement.textContent = `Date (Local): ${launch.date_local}`;
        } else {
            dateLocalElement.textContent = '';
        }

        // Date Precision
        const datePrecisionElement = document.getElementById('date-precision');
        if (launch.date_precision) {
            datePrecisionElement.textContent = `Date Precision: ${launch.date_precision}`;
        } else {
            datePrecisionElement.textContent = '';
        }

        // Upcoming
        const upcomingElement = document.getElementById('upcoming');
        if (launch.upcoming !== null) {
            upcomingElement.textContent = `Upcoming: ${launch.upcoming ? 'Yes' : 'No'}`;
        } else {
            upcomingElement.textContent = '';
        }

        // Cores
        const coreDetailsElement = document.getElementById('core-details');
        if (launch.cores && launch.cores.length > 0) {
            const coreDetails = launch.cores.map(core => `
                Core: ${core.core}, 
                Flight: ${core.flight}, 
                Gridfins: ${core.gridfins ? 'Yes' : 'No'}, 
                Legs: ${core.legs ? 'Yes' : 'No'}, 
                Reused: ${core.reused ? 'Yes' : 'No'}, 
                Landing Attempt: ${core.landing_attempt ? 'Yes' : 'No'}, 
                Landing Success: ${core.landing_success ? 'Yes' : 'No'}, 
                Landing Type: ${core.landing_type}, 
                Landpad: ${core.landpad}
            `).join('<br>');
            coreDetailsElement.innerHTML = coreDetails;
        } else {
            coreDetailsElement.textContent = '';
        }

        // Actualizacion de imagenes (Inicia con la primera del JSON)
        currentImageIndex = 0;
        updateImage(currentImageIndex);
    };

    const updateImage = (index) => {
        const images = launches[currentLaunchIndex].links.flickr.original;
        if (images.length > 0) {
            document.getElementById('image_crew').src = images[index];
        } else {
            document.getElementById('image_crew').src = './storage/image/launch_reemplazo.jpg';
        }
    };

    document.getElementById('left_arrow').addEventListener('click', () => {
        currentLaunchIndex = (currentLaunchIndex - 1 + launches.length) % launches.length;
        updateContent(currentLaunchIndex);
    });

    document.getElementById('right_arrow').addEventListener('click', () => {
        currentLaunchIndex = (currentLaunchIndex + 1) % launches.length;
        updateContent(currentLaunchIndex);
    });

    document.getElementById('image_crew').addEventListener('click', (event) => {
        const images = launches[currentLaunchIndex].links.flickr.original;
        if (images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateImage(currentImageIndex);
        }
    });

    // Se muestran los datos cuando se carga la página
    updateContent(currentLaunchIndex);
});