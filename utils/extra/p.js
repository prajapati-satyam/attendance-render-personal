document.addEventListener('DOMContentLoaded', () => {
    fetchAllRecords();
    fetchSubjects();

    document.getElementById('updateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const subject = document.getElementById('subjectSelect').value;
        const present = document.getElementById('presentInput').value || 0;
        const absent = document.getElementById('absentInput').value || 0;

        const response = await fetch('https://myattendancebot.vercel.app/up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Subject: subject, Present: present, Absent: absent })
        });

        const result = await response.json();
        document.getElementById('updateMessage').innerText = result.code === 200 ? 'Updated successfully!' : 'Unable to update data.';
        
        if (response.ok) {
            fetchAllRecords(); // Refresh records
        }
    });
});

// Fetch all attendance records
async function fetchAllRecords() {
    const response = await fetch('https://myattendancebot.vercel.app/all');
    const records = await response.json();
    
    const container = document.getElementById('recordsContainer');
    container.innerHTML = ''; // Clear existing records
    
    records.forEach(record => {
        const card = document.createElement('div');
        card.className = "bg-white p-4 rounded shadow hover:shadow-lg transition";
        card.innerHTML = `
            <h3 class="font-bold">${record.Subject}</h3>
            <p>Slot Type: ${record.SlotType}</p>
            <p>Conducted: ${record.Conducted}</p>
            <p>Present: ${record.Present}</p>
            <p>Absent: ${record.Absent}</p>
            <p>Attendance Percentage: ${record.AttendancePercentage}</p>
        `;
        container.appendChild(card);
    });
}

// Fetch subjects for the select dropdown
async function fetchSubjects() {
    // Assuming subjects are fetched from an endpoint
    const subjects = ['24BCA408 - PROFESSIONAL ETHICS', 'Another Subject']; // Replace with actual fetch
    const select = document.getElementById('subjectSelect');
    
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        select.appendChild(option);
    });
}
