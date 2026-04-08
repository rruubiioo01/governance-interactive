// app.js file with voting functionality

// Initialize localStorage for anonymous voting
let votes = JSON.parse(localStorage.getItem('votes')) || {};

// Track the voting logic
const voteCount = { optionA: 0, optionB: 0 };

// Function to handle voting
function vote(option) {
    if (!votes[option]) {
        votes[option] = 1;
    } else {
        votes[option] += 1;
    }
    localStorage.setItem('votes', JSON.stringify(votes));
    updateVoteCount();
}

// Function to update the vote count
function updateVoteCount() {
    voteCount.optionA = votes.optionA || 0;
    voteCount.optionB = votes.optionB || 0;
    renderChart(); // Update the chart display
}

// Function to render the chart
function renderChart() {
    const ctx = document.getElementById('voteChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Option A', 'Option B'],
            datasets: [{
                label: 'Votes',
                data: [voteCount.optionA, voteCount.optionB],
                backgroundColor: ['#FF6384', '#36A2EB'],
            }]
        },
        options: { scales: { y: { beginAtZero: true } } }
    });
}

// Function to transition between sections
function transitionToVoting() {
    document.getElementById('introduction').style.display = 'none';
    document.getElementById('votingSection').style.display = 'block';
    animateTransition();
}

// Function for animations trigger
function animateTransition() {
    // Add animations here
}

// Data persistence on page reload
window.onload = () => {
    updateVoteCount(); // Load previous votes from localStorage
};

// Event listeners for voting
document.getElementById('voteA').addEventListener('click', () => vote('optionA'));
document.getElementById('voteB').addEventListener('click', () => vote('optionB'));

// Initial setup
transitionToVoting();
