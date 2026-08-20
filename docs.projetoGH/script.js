// Language color mapping for common programming languages
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#239120',
    'Go': '#00ADD8',
    'Rust': '#ce422b',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Kotlin': '#7f52ff',
    'Swift': '#FA7343',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Vue': '#4FC08D',
    'React': '#61dafb',
};

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const resultsList = document.getElementById('resultsList');

// Event listener for search
searchInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            resultsContainer.classList.add('hidden');
            return;
        }

        await searchRepositories(searchTerm);
    }
});

/**
 * Search repositories on GitHub
 * @param {string} searchTerm - The search term
 */
async function searchRepositories(searchTerm) {
    try {
        // Show loading state
        showLoadingState();

        // Build the API URL
        const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchTerm)}&sort=stars&per_page=10`;

        // Make the fetch request
        const response = await fetch(apiUrl);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Check if we have results
        if (data.items.length === 0) {
            showEmptyState();
        } else {
            displayResults(data.items);
        }

    } catch (error) {
        console.error('Error searching repositories:', error);
        showErrorState(error.message);
    }
}

/**
 * Display loading state
 */
function showLoadingState() {
    resultsContainer.classList.remove('hidden');
    loadingState.classList.remove('hidden');
    emptyState.classList.add('hidden');
    errorState.classList.add('hidden');
    resultsList.classList.add('hidden');
}

/**
 * Display empty state
 */
function showEmptyState() {
    resultsContainer.classList.remove('hidden');
    loadingState.classList.add('hidden');
    emptyState.classList.remove('hidden');
    errorState.classList.add('hidden');
    resultsList.classList.add('hidden');
}

/**
 * Display error state
 * @param {string} message - Error message
 */
function showErrorState(message) {
    resultsContainer.classList.remove('hidden');
    loadingState.classList.add('hidden');
    emptyState.classList.add('hidden');
    errorState.classList.remove('hidden');
    resultsList.classList.add('hidden');
    errorMessage.textContent = 'Ocorreu um erro ao buscar repositórios. Tente novamente.';
}

/**
 * Display search results
 * @param {Array} repositories - Array of repository objects from GitHub API
 */
function displayResults(repositories) {
    // Clear previous results
    resultsList.innerHTML = '';

    // Create repository items
    repositories.forEach(repo => {
        const repoElement = createRepositoryElement(repo);
        resultsList.appendChild(repoElement);
    });

    // Show results
    resultsContainer.classList.remove('hidden');
    loadingState.classList.add('hidden');
    emptyState.classList.add('hidden');
    errorState.classList.add('hidden');
    resultsList.classList.remove('hidden');
}

/**
 * Create a repository element
 * @param {Object} repo - Repository object from GitHub API
 * @returns {HTMLElement} Repository item element
 */
function createRepositoryElement(repo) {
    const repoItem = document.createElement('div');
    repoItem.className = 'repo-item';

    // Author info
    const authorAvatar = repo.owner.avatar_url;
    const authorName = repo.owner.login;
    const authorUrl = repo.owner.html_url;

    // Repository info
    const repoName = repo.name;
    const repoUrl = repo.html_url;
    const description = repo.description || 'Sem descrição disponível.';
    const language = repo.language || 'Desconhecida';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;

    // Language color
    const languageColor = languageColors[language] || '#8b949e';

    repoItem.innerHTML = `
        <div class="repo-header">
            <img src="${authorAvatar}" alt="${authorName}" class="author-avatar" onerror="this.src='https://avatars.githubusercontent.com/u/0?v=4'">
            <div class="author-info">
                <a href="${authorUrl}" target="_blank" class="author-name">${authorName}</a>
                <a href="${repoUrl}" target="_blank" class="repo-name">${repoName}</a>
            </div>
        </div>
        <p class="repo-description">${description}</p>
        <div class="repo-meta">
            <div class="meta-item language-badge">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                <span>${language}</span>
            </div>
            <div class="meta-item stars">
                <svg class="meta-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 10 5.6l4.5.65-3.25 3.18.77 4.48L8 11.8l-4.02 2.11.77-4.48L1.5 6.25 6 5.6 8 1.5Z"/></svg>
                ${formatNumber(stars)} stars
            </div>
            <div class="meta-item forks">
                <svg class="meta-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5a2 2 0 1 1-1.5 1.94V10A2.5 2.5 0 0 0 6 12.5h1.5a2 2 0 0 1 4 0 2 2 0 1 1-1.5-1.94V8A2.5 2.5 0 0 0 7.5 5.5H6a2 2 0 0 1-1-2Z"/></svg>
                ${formatNumber(forks)} forks
            </div>
            <a class="repo-link" href="${repoUrl}" target="_blank" rel="noopener noreferrer">Ver no GitHub &rarr;</a>
        </div>
    `;

    return repoItem;
}

/**
 * Format large numbers (e.g., 1000 -> 1K)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
