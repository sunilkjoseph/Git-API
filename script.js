const API_TOKEN = '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';
const USERNAME = 'sunilkjoseph';

async function fetchProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

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
        const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

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
