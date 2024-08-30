document.getElementById('generateBtn').addEventListener('click', generateCV);

function generateCV() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value.split('\n');
    const education = document.getElementById('education').value.split('\n');
    const skills = document.getElementById('skills').value.split(',');
    const hobbies = document.getElementById('hobbies').value.split(',');

    const cvOutput = document.getElementById('cvOutput');
    cvOutput.innerHTML = `
        <h2>${name.toUpperCase()}</h2>
        <h3>${title}</h3>

        <div class="section">
            <h3>Summary</h3>
            <p>${summary}</p>
        </div>

        <div class="section">
            <h3>Experience</h3>
            <ul>
                ${experience.map(job => `<li>${job}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h3>Education</h3>
            <ul>
                ${education.map(edu => `<li>${edu}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h3>Skills</h3>
            <p>${skills.join(', ')}</p>
        </div>

        <div class="section">
            <h3>Hobbies</h3>
            <p>${hobbies.join(', ')}</p>
        </div>
    `;
}
