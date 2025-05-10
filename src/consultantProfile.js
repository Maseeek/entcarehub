// consultantProfile.js
async function showConsultantProfile(id) {
    let idEncoded = encodeURIComponent(id);
    try {
        // Fix the API path - use a relative path that works from the current location
        const response = await fetch(`get-consultant-profile.php?id=${idEncoded}`);
        const consultants = await response.json();

        if (consultants.length > 0) {
            const consultant = consultants[0]; // Get the first result
            displayConsultantProfile(consultant);
        } else {
            console.error("No consultant found with ID:", id);
        }
    } catch (error) {
        console.error("Error fetching consultant profile:", error);
    }
}

async function displayConsultantVsAverageGraph(consultantId) {
    try {
        // Fetch the selected consultant data
        const consultantResponse = await fetch(`get-consultant-profile.php?id=${encodeURIComponent(consultantId)}`);
        const consultantData = await consultantResponse.json();

        if (consultantData.length === 0) {
            console.error('No consultant found with that ID');
            return;
        }

        const consultant = consultantData[0];

        // Fetch all consultants to calculate average
        const allConsultantsResponse = await fetch('process-leaderboard-request.php');
        const allConsultants = await allConsultantsResponse.json();

        // Calculate overall average rating
        const totalRating = allConsultants.reduce((sum, c) => sum + parseFloat(c.average_score), 0);
        const averageRating = totalRating / allConsultants.length;

        // Create canvas for the chart if it doesn't exist
        const chartContainer = document.getElementById('rating-comparison-chart-container');
        chartContainer.innerHTML = '<canvas id="rating-comparison-chart"></canvas>';

        const ctx = document.getElementById('rating-comparison-chart').getContext('2d');

        // Create the comparison chart
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
                        title: {
                            display: true,
                            text: 'Rating (0-5)',
                            color: '#e0e0e0'
                        },
                        ticks: {
                            color: '#e0e0e0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#e0e0e0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Consultant Rating vs. Overall Average',
                        color: '#e0e0e0'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Rating: ${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error generating comparison chart:', error);
    }
}

async function displayConsultantRecommendationPieChart(consultantId) {
    try {
        // Fetch the selected consultant data
        const consultantResponse = await fetch(`get-consultant-profile.php?id=${encodeURIComponent(consultantId)}`);
        const consultantData = await consultantResponse.json();

        if (consultantData.length === 0) {
            console.error('No consultant found with that ID');
            return;
        }

        const consultant = consultantData[0];

        // Create canvas for the chart if it doesn't exist
        const chartContainer = document.getElementById('recommendation-pie-chart-container');
        chartContainer.innerHTML = '<canvas id="recommendation-pie-chart"></canvas>';

        const ctx = document.getElementById('recommendation-pie-chart').getContext('2d');

        // Get recommendation percentage or use a default if not available
        const recommendationPercentage = parseFloat(consultant.recommendation_percentage || 0);
        const notRecommendedPercentage = 100 - recommendationPercentage;

        // Create the pie chart
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
                    title: {
                        display: true,
                        text: 'Patient Recommendations',
                        color: '#e0e0e0'
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e0e0e0'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw.toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error generating recommendation pie chart:', error);
    }
}
function displayConsultantProfile(consultant) {
    // Create backdrop and modal if they don't exist
    const backdrop = document.getElementById('modal-backdrop') || createBackdrop();
    const profileContainer = document.getElementById('consultant-profile') || createProfileContainer();

    // Clear previous content
    profileContainer.innerHTML = '';

    // Format the map URL with actual latitude and longitude
    const mapSrc = `https://www.google.com/maps?q=${consultant.latitude},${consultant.longitude}&z=15&output=embed`;

    // Format the rating to display only up to 1 decimal place
    const rating = parseFloat(consultant.average_rating).toFixed(1);

    // Create profile content with rating badge in top right
    const content = `
        <div class="profile-header">
            <h2>${consultant.name}</h2>
            <div class="rating-badge">${rating}<span class="star">⭐</span></div>
            <p class="consultation-fee">Consultation Fee: $${consultant.consultation_fee}</p>
        </div>
        <div class="profile-details">
            <p><strong>Clinic:</strong> ${consultant.clinic_name}</p>
            <div class="map-container">
                <iframe
                    class="location-map"
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="${mapSrc}">
                </iframe>
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

    // Show the profile container and backdrop
    profileContainer.style.display = 'block';
    backdrop.style.display = 'block';

    // Generate the charts
    displayConsultantVsAverageGraph(consultant.id);
    displayConsultantRecommendationPieChart(consultant.id);

    // Add event listener to close button
    const closeBtn = profileContainer.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            profileContainer.style.display = 'none';
            backdrop.style.display = 'none';
        });
    }
}
function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', () => {
        const profileContainer = document.getElementById('consultant-profile');
        if (profileContainer) {
            profileContainer.style.display = 'none';
        }
        backdrop.style.display = 'none';
    });

    return backdrop;
}

function createProfileContainer() {
    const container = document.createElement('div');
    container.id = 'consultant-profile';
    container.className = 'consultant-profile-modal';
    document.body.appendChild(container);
    return container;
}

// Export functions for use in other files
window.consultantProfile = {
    show: showConsultantProfile,
    display: displayConsultantProfile
};