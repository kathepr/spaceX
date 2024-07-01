document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.spacexdata.com/v4/starlink/";
    const launchApiUrl = "https://api.spacexdata.com/v4/launches/";

    const leftArrow = document.getElementById("left_arrow");
    const rightArrow = document.getElementById("right_arrow");
    const carouselItems = document.querySelectorAll(".carousel__item");
    const navLeft = document.querySelector(".nav__left .description__item");
    const navRight = document.querySelector(".nav__right .information__item");

    let starlinkData = [];
    let currentIndex = 0;

    const fetchStarlinkData = async () => {
        try {
            const response = await fetch(apiUrl);
            starlinkData = await response.json();
            displayData(currentIndex);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchLaunchData = async (launchId) => {
        try {
            const response = await fetch(`${launchApiUrl}${launchId}`);
            const launchData = await response.json();
            return launchData.name;
        } catch (error) {
            console.error("Error fetching launch data: ", error);
        }
    };

    const displayData = async (index) => {
        const data = starlinkData[index];
        const spaceTrack = data.spaceTrack;

        // Fetch launch name
        const launchName = await fetchLaunchData(data.launch);

        // Nav left
        navLeft.innerHTML = `
            <div class="description__container">
                <h2>Spacetrack Information</h2>
                <p>Version: ${spaceTrack.CCSDS_OMM_VERS}</p>
                <p>Creation Date: ${spaceTrack.CREATION_DATE}</p>
                <p>Originator: ${spaceTrack.ORIGINATOR}</p>
                <p>Object ID: ${spaceTrack.OBJECT_ID}</p>
                <p>Center Name: ${spaceTrack.CENTER_NAME}</p>
                <p>Reference Frame: ${spaceTrack.REF_FRAME}</p>
                <p>Time System: ${spaceTrack.TIME_SYSTEM}</p>
                <p>Mean Element Theory: ${spaceTrack.MEAN_ELEMENT_THEORY}</p>
                <p>Epoch: ${spaceTrack.EPOCH}</p>
                <p>Mean Motion: ${spaceTrack.MEAN_MOTION}</p>
                <p>Eccentricity: ${spaceTrack.ECCENTRICITY}</p>
                <p>Inclination: ${spaceTrack.INCLINATION}</p>
                <p>RA of Asc Node: ${spaceTrack.RA_OF_ASC_NODE}</p>
                <p>Arg of Pericenter: ${spaceTrack.ARG_OF_PERICENTER}</p>
                <p>Mean Anomaly: ${spaceTrack.MEAN_ANOMALY}</p>
                <p>Ephemeris Type: ${spaceTrack.EPHEMERIS_TYPE}</p>
                <p>Classification Type: ${spaceTrack.CLASSIFICATION_TYPE}</p>
                <p>NORAD Catalog ID: ${spaceTrack.NORAD_CAT_ID}</p>
                <p>Element Set No: ${spaceTrack.ELEMENT_SET_NO}</p>
                <p>Rev at Epoch: ${spaceTrack.REV_AT_EPOCH}</p>
                <p>BSTAR: ${spaceTrack.BSTAR}</p>
                <p>Mean Motion Dot: ${spaceTrack.MEAN_MOTION_DOT}</p>
                <p>Mean Motion Ddot: ${spaceTrack.MEAN_MOTION_DDOT}</p>
                <p>Semimajor Axis: ${spaceTrack.SEMIMAJOR_AXIS}</p>
            </div>
        `;

        // Nav right
        navRight.innerHTML = `
            <h2>Spacetrack Information</h2>
            <p>Period: ${spaceTrack.PERIOD}</p>
            <p>Apoapsis: ${spaceTrack.APOAPSIS}</p>
            <p>Periapsis: ${spaceTrack.PERIAPSIS}</p>
            <p>Object Type: ${spaceTrack.OBJECT_TYPE}</p>
            <p>Country Code: ${spaceTrack.COUNTRY_CODE}</p>
            <p>Launch Date: ${spaceTrack.LAUNCH_DATE}</p>
            <p>Launch Site: ${spaceTrack.SITE}</p>
            <p>Decay Date: ${spaceTrack.DECAY_DATE}</p>
            <p>Decay Status: ${spaceTrack.DECAYED}</p>
            <p>TLE Line 0: ${spaceTrack.TLE_LINE0}</p>
            <p>TLE Line 1: ${spaceTrack.TLE_LINE1}</p>
            <p>TLE Line 2: ${spaceTrack.TLE_LINE2}</p>
            <p>Longitude: ${data.longitude}</p>
            <p>Latitude: ${data.latitude}</p>
            <p>Height (km): ${data.height_km}</p>
            <p>Velocity (km/s): ${data.velocity_kms}</p>
        `;

        // Carousel
        carouselItems[0].textContent = `Name: ${spaceTrack.OBJECT_NAME}`
        carouselItems[1].textContent = `Version: ${data.version}`;
        carouselItems[2].textContent = `Launch: ${launchName}`;
    };

    const showPrevious = () => {
        currentIndex = (currentIndex - 1 + starlinkData.length) % starlinkData.length;
        displayData(currentIndex);
    };
    
    const showNext = () => {
        currentIndex = (currentIndex + 1) % starlinkData.length;
        displayData(currentIndex);
    };
    
    leftArrow.addEventListener("click", showPrevious);
    rightArrow.addEventListener("click", showNext);

    fetchStarlinkData();
});