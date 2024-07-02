document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.spacexdata.com/v4/history/';
    let historyData = [];
    let currentIndex = 0;

    const titleElement = document.querySelector('.carousel__item:nth-child(1)');
    const dateElement = document.querySelector('.carousel__item:nth-child(2)');
    const eventDateUnixElement = document.querySelector('.description__container:nth-child(2)');
    const detailsElement = document.querySelector('.description__container:nth-child(3)');
    const articleLinkElement = document.querySelector('.description__container ul li a');

    const leftArrow = document.getElementById('left_arrow');
    const rightArrow = document.getElementById('right_arrow');

    const fetchHistoryData = async () => {
        try {
            const response = await fetch(API_URL);
            historyData = await response.json();
            displayData(currentIndex);
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
    };

    const displayData = (index) => {
        const { title, event_date_utc, event_date_unix, details, links } = historyData[index];
        titleElement.textContent = `Title: ${title}`;
        dateElement.textContent = `Event Date: ${new Date(event_date_utc).toLocaleString()}`;
        eventDateUnixElement.textContent = `Event Date (Unix): ${event_date_unix}`;
        detailsElement.textContent = `Details: ${details}`;
        articleLinkElement.href = links.article;
        articleLinkElement.textContent = 'More Details';
    };

    const showNextItem = () => {
        currentIndex = (currentIndex + 1) % historyData.length;
        displayData(currentIndex);
    };

    const showPreviousItem = () => {
        currentIndex = (currentIndex - 1 + historyData.length) % historyData.length;
        displayData(currentIndex);
    };

    leftArrow.addEventListener('click', showPreviousItem);
    rightArrow.addEventListener('click', showNextItem);

    fetchHistoryData();
});