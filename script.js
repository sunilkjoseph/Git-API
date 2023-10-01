const USERNAME = 'sunilkjoseph'; // Replace with your GitHub username

async function fetchProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}`);

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const profile = await response.json();
        const profilePicture = document.getElementById('profile-picture');
        const profileName = document.getElementById('profile-name');
        const profileBio = document.getElementById('profile-bio');

        profilePicture.src = profile.avatar_url;
        profileName.textContent = profile.name || USERNAME;
        profileBio.textContent = profile.bio || 'No bio available';
    } catch (error) {
        console.error(error);
    }
}

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`);

        if (!response.ok) {
            throw new Error('Failed to fetch repo data');
        }

        const repos = await response.json();
        const repoList = document.getElementById('repo-list');

        repos.forEach((repo) => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');
            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <p id="pub">${repo.private ? 'Private' : 'Public'}</p>
                <a href="${repo.html_url}" class="repo-button" target="_blank">GitHub Repo</a>
            `;
            repoList.appendChild(repoCard);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchProfile();
fetchRepos();
