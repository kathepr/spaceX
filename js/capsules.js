document.addEventListener('DOMContentLoaded', async () => {
    const capsulesUrl = 'https://api.spacexdata.com/v4/capsules/';
    const launchesUrl = 'https://api.spacexdata.com/v4/launches/';
    let capsules = [];
    let currentIndex = 0;

    async function fetchData() {
        try {
            const response = await fetch(capsulesUrl);
            capsules = await response.json();
            await displayData(currentIndex);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchLaunchName(launchId) {
        try {
            const response = await fetch(`${launchesUrl}${launchId}`);
            const launchData = await response.json();
            return launchData.name;
        } catch (error) {
            console.error('Error fetching launch data:', error);
            return 'Unknown Launch';
        }
    }

    async function displayData(index) {
        const capsule = capsules[index];
        
        document.querySelector('#reuse_count p').textContent = capsule.reuse_count;
        document.querySelector('#water_landings p').textContent = capsule.water_landings;
        document.querySelector('#land_landings p').textContent = capsule.land_landings;
        document.querySelector('#last_update p').textContent = capsule.last_update;

        let launchNames = 'None';
        if (capsule.launches.length > 0) {
            launchNames = await Promise.all(capsule.launches.map(fetchLaunchName));
            launchNames = launchNames.join(', ');
        }
        document.querySelector('#launches p').textContent = launchNames;

        document.querySelector('#serial').textContent = `Serial: ${capsule.serial}`;
        document.querySelector('#type').textContent = `Type: ${capsule.type}`;
        document.querySelector('#status').textContent = `Status: ${capsule.status}`;
    }

    function nextCapsule() {
        currentIndex = (currentIndex + 1) % capsules.length;
        displayData(currentIndex);
    }

    function previousCapsule() {
        currentIndex = (currentIndex - 1 + capsules.length) % capsules.length;
        displayData(currentIndex);
    }

    document.getElementById('left_arrow').addEventListener('click', previousCapsule);
    document.getElementById('right_arrow').addEventListener('click', nextCapsule);

    fetchData();
});