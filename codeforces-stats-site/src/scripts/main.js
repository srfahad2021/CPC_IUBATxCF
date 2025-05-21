// This file contains the JavaScript logic for the website. It handles fetching data from the Codeforces API, processing user handles, and updating the UI with statistics. It also manages the interactivity of the navbar and other components.

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const welcomeSection = document.getElementById('welcome-section');
    const statsSection = document.getElementById('stats-section');

    // Function to fetch Codeforces statistics
    async function fetchStatistics(userHandle) {
        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${userHandle}`);
            const data = await response.json();
            if (data.status === 'OK') {
                updateStatistics(data.result[0]);
            } else {
                console.error('Error fetching data:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    // Function to update the UI with statistics
    function updateStatistics(userData) {
        const statsContainer = document.getElementById('stats-container');
        statsContainer.innerHTML = `
            <h3>${userData.handle}'s Statistics</h3>
            <p>Rating: ${userData.rating}</p>
            <p>Rank: ${userData.rank}</p>
            <p>Contribution: ${userData.contribution}</p>
        `;
    }

    // Event listener for navbar links
    navbar.addEventListener('click', (event) => {
        if (event.target.matches('.nav-link')) {
            const userHandle = event.target.dataset.handle;
            fetchStatistics(userHandle);
            welcomeSection.style.display = 'none';
            statsSection.style.display = 'block';
        }
    });

    // Initial setup
    welcomeSection.style.display = 'block';
    statsSection.style.display = 'none';
});