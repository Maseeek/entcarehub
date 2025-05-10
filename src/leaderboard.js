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
    // Create or get the profile container
    const profileContainer = document.getElementById('consultant-profile') || createProfileContainer();

    // Clear previous content
    profileContainer.innerHTML = '';

    // Create profile content
    const content = `
        <div class="profile-header">
            <h2>${consultant.name}</h2>
            <p class="consultation-fee">Consultation Fee: $${consultant.consultation_fee}</p>
        </div>
        <div class="profile-details">
            <p><strong>Clinic:</strong> ${consultant.clinic_name}</p>
            <p><strong>Location:</strong> Lat: ${consultant.latitude}, Lng: ${consultant.longitude}</p>
        </div>
        <div class="profile-actions">
            <button class="book-btn">Book Appointment</button>
            <button class="close-btn">Close</button>
        </div>
    `;

    profileContainer.innerHTML = content;

    // Show the profile container
    profileContainer.style.display = 'block';

    // Add event listener to close button
    const closeBtn = profileContainer.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            profileContainer.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        if (!profileContainer.contains(event.target) && event.target !== profileContainer) {
            profileContainer.style.display = 'none';
        }
    });
}

function createProfileContainer() {
    const container = document.createElement('div');
    container.id = 'consultant-profile';
    container.className = 'consultant-profile-modal';
    document.body.appendChild(container);
    return container;
}




// Fetch and display both leaderboards on page load
leaderboardByRating();
leaderboardByRecommendation();