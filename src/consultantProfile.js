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

function displayConsultantProfile(consultant) {
    // Create backdrop and modal if they don't exist
    const backdrop = document.getElementById('modal-backdrop') || createBackdrop();
    const profileContainer = document.getElementById('consultant-profile') || createProfileContainer();

    // Clear previous content
    profileContainer.innerHTML = '';

    // Format the map URL with actual latitude and longitude
    const mapSrc = `https://www.google.com/maps?q=${consultant.latitude},${consultant.longitude}&z=15&output=embed`;

    // Create profile content with improved map styling
    const content = `
        <div class="profile-header">
            <h2>${consultant.name}</h2>
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