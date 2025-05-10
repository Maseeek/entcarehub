async function leaderboardByRating() {
    const response = await fetch(`process-leaderboard-request.php`);
    const consultants = await response.json();
    displayRatings(consultants);
}

function displayRatings(consultants) {
    // Select the "Highest Rating" leaderboard container
    const leaderboard = document.querySelector("section:nth-of-type(2) .leaderboard");

    // Clear existing rows (except the header)
    const rows = leaderboard.querySelectorAll(".leaderboard-row:not(.header)");
    rows.forEach(row => row.remove());

    // Insert new rows for each consultant
    consultants.forEach((consultant, index) => {
        const row = document.createElement("div");
        row.classList.add("leaderboard-row");

        // Rank column
        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.textContent = index + 1;
        row.appendChild(rank);

        // Name column
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = consultant.name;
        name.setAttribute("data-id", consultant.id); // Add consultant ID as data attribute
        name.style.cursor = "pointer"; // Add cursor pointer to indicate clickable
        // Add click event listener directly to each name
        name.addEventListener("click", () => {
            showConsultantProfile(consultant.id);
        });
        row.appendChild(name);

        // Score column
        const score = document.createElement("div");
        score.classList.add("score");
        score.textContent = consultant.average_score.toString().substring(0, 3) + "⭐";
        if(consultant.average_score > 4.0){
            score.style.color = "green";
        }
        else if(consultant.average_score >= 3){
            score.style.color = "orange";
        }
        else{
            score.style.color = "red";
        }
        row.appendChild(score);

        // Append the row to the leaderboard
        leaderboard.appendChild(row);
    });
}
async function leaderboardByRecommendation() {
    const response = await fetch(`process-leaderboard1-request.php`);
    const consultants = await response.json();
    displayRecommendations(consultants);
}

function displayRecommendations(consultants) {
    const leaderboard = document.querySelector("section:nth-of-type(1) .leaderboard");
    const rows = leaderboard.querySelectorAll(".leaderboard-row:not(.header)");
    rows.forEach(row => row.remove());

    consultants.forEach((consultant, index) => {
        const row = document.createElement("div");
        row.classList.add("leaderboard-row");

        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.textContent = index + 1;
        row.appendChild(rank);

        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = consultant.name;
        name.setAttribute("data-id", consultant.id); // Add consultant ID as data attribute
        name.style.cursor = "pointer"; // Add cursor pointer to indicate clickable
        // Add click event listener directly to each name
        name.addEventListener("click", () => {
            showConsultantProfile(consultant.id);
        });
        row.appendChild(name);

        const recommendations = document.createElement("div");
        recommendations.classList.add("recommendations");
        recommendations.textContent = `Total: ${consultant.total_recommendations}`;
        row.appendChild(recommendations);

        const score = document.createElement("div");
        score.classList.add("score");
        score.textContent = `${consultant.recommendation_percentage.toString().substring(0, 5)}%`;
        if(consultant.recommendation_percentage > 70){
            score.style.color = "green";
        }
        else if(consultant.recommendation_percentage >= 50){
            score.style.color = "orange";
        }
        else{
            score.style.color = "red";
        }
        row.appendChild(score);

        leaderboard.appendChild(row);
    });
}

async function showConsultantProfile(id) {
    let idEncoded = encodeURIComponent(id);
    const response = await fetch(`get-consultant-profile.php?id=${idEncoded}`);
    const consultants = await response.json();

    if (consultants.length > 0) {
        const consultant = consultants[0]; // Get the first result
        displayConsultantProfile(consultant);
    } else {
        console.error("No consultant found with ID:", id);
    }
}

function displayConsultantProfile(consultant) {
    const profileContainer = document.getElementById('consultant-profile') || createProfileContainer();
    const backdrop = document.getElementById('modal-backdrop') || createBackdrop();

    profileContainer.innerHTML = '';

    const mapSrc = `https://www.google.com/maps?q=${consultant.latitude},${consultant.longitude}&z=15&output=embed`;
    const rating = parseFloat(consultant.average_rating).toFixed(1);

    const content = `
        <div class="profile-header">
            <h2>${consultant.name}</h2>
            <div class="rating-badge">${rating}<span class="star">⭐</span></div>
            <p class="consultation-fee">Consultation Fee: $${consultant.consultation_fee}</p>
        </div>
        <div class="profile-details">
            <p><strong>Clinic:</strong> ${consultant.clinic_name}</p>
            <div class="map-container">
                <iframe class="location-map" loading="lazy" allowfullscreen src="${mapSrc}"></iframe>
            </div>
            <div class="charts-container">
                <div class="chart-row">
                    <div class="chart-column">
                        <div id="rating-comparison-chart-container" style="height: 200px;"></div>
                    </div>
                    <div class="chart-column">
                        <div id="recommendation-pie-chart-container" style="height: 200px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-actions">
            <button class="book-btn">Book Appointment</button>
            <button class="close-btn">Close</button>
        </div>
    `;

    profileContainer.innerHTML = content;
    profileContainer.style.display = 'block';
    backdrop.style.display = 'block';

    displayConsultantVsAverageGraph(consultant.id);
    displayConsultantRecommendationPieChart(consultant.id);

    const closeBtn = profileContainer.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            profileContainer.style.display = 'none';
            backdrop.style.display = 'none';
        });
    }
}

function displayConsultantVsAverageGraph(consultantId) {
    fetch(`get-consultant-profile.php?id=${encodeURIComponent(consultantId)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return;

            const consultant = data[0];
            const averageRating = 4.2; // Replace with actual average rating if available

            const chartContainer = document.getElementById('rating-comparison-chart-container');
            chartContainer.innerHTML = '<canvas id="rating-comparison-chart"></canvas>';

            const ctx = document.getElementById('rating-comparison-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [consultant.name, 'Overall Average'],
                    datasets: [{
                        label: 'Rating Comparison',
                        data: [parseFloat(consultant.average_rating), averageRating],
                        backgroundColor: ['#547AA5', '#3a3a4d'],
                        borderColor: ['#6B9DC8', '#5a5a6d'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 5,
                            title: { display: true, text: 'Rating (0-5)', color: '#e0e0e0' },
                            ticks: { color: '#e0e0e0' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: '#e0e0e0' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    },
                    plugins: {
                        title: { display: true, text: 'Consultant Rating vs. Overall Average', color: '#e0e0e0' },
                        tooltip: {
                            callbacks: {
                                label: context => `Rating: ${context.raw.toFixed(2)}`
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error generating comparison chart:', error));
}

function displayConsultantRecommendationPieChart(consultantId) {
    fetch(`get-consultant-profile.php?id=${encodeURIComponent(consultantId)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return;

            const consultant = data[0];
            const recommendationPercentage = parseFloat(consultant.recommendation_percentage || 0);
            const notRecommendedPercentage = 100 - recommendationPercentage;

            const chartContainer = document.getElementById('recommendation-pie-chart-container');
            chartContainer.innerHTML = '<canvas id="recommendation-pie-chart"></canvas>';

            const ctx = document.getElementById('recommendation-pie-chart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Recommended', 'Not Recommended'],
                    datasets: [{
                        data: [recommendationPercentage, notRecommendedPercentage],
                        backgroundColor: ['#547AA5', '#3a3a4d'],
                        borderColor: ['#6B9DC8', '#5a5a6d'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: 'Patient Recommendations', color: '#e0e0e0' },
                        legend: { position: 'bottom', labels: { color: '#e0e0e0' } },
                        tooltip: {
                            callbacks: {
                                label: context => `${context.label}: ${context.raw.toFixed(1)}%`
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error generating recommendation pie chart:', error));
}

function createProfileContainer() {
    const container = document.createElement('div');
    container.id = 'consultant-profile';
    container.className = 'consultant-profile-modal';
    document.body.appendChild(container);
    return container;
}

function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', () => {
        const profileContainer = document.getElementById('consultant-profile');
        if (profileContainer) profileContainer.style.display = 'none';
        backdrop.style.display = 'none';
    });

    return backdrop;
}




// Fetch and display both leaderboards on page load
leaderboardByRating();
leaderboardByRecommendation();