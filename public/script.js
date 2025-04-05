// Fetch and display data on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  fetchSubjects();
});

// const baseUrl = 'https://myattendancebot-vh5p.vercel.app';
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://attendance-render-personal.onrender.com'

// Fetch all data from /all endpoint
async function fetchData() {
  try {
    const response = await fetch(`${baseUrl}/all`);
    const data = await response.json();
    if (data) {
      displayData(data);
    } else {
      alert("Unauthorized Access")
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Display data in card format
function displayData(data) {
  const container = document.getElementById('dataContainer');
  container.innerHTML = data.map((item) => {
    let bgcolor = '';
    const tetxcolor = 'text-white'
    const convert = parseFloat(item.AttendancePercentage)
    if (convert >= 75) {
      bgcolor = 'bg-green-500'
    } else {
      bgcolor = 'bg-red-500'
    }
    return `<div class="${bgcolor} p-4 rounded-lg shadow-lg ${tetxcolor} hover:scale-105 transition-transform">
    <h3 class="text-xl font-semibold">${item.Subject}</h3>
    <p>Slot Type: ${item.SlotType}</p>
    <p>Conducted: ${item.Conducted}</p>
    <p>Present: ${item.Present}</p>
    <p>Absent: ${item.Absent}</p>
    <p>Attendance: ${item.AttendancePercentage}</p>
    </div>
    `}
  ).join('');
}

// Fetch subjects and slot types for the select dropdown
async function fetchSubjects() {
  try {
    const response = await fetch('/all');
    const data = await response.json();
    const subjectSelect = document.getElementById('subject');
    const slotTypeSelect = document.getElementById('slotType');
    const subjectdelete = document.getElementById('subjectdelete');
    const slotTypeDelete = document.getElementById('slotTypeDelete');


    // Populate subjects
    subjectSelect.innerHTML = '<option value="">Select Subject</option>' + data.map(item => `
      <option value="${item.Subject}">${item.Subject}</option>
    `).join('');

    subjectdelete.innerHTML = '<option value="">Select Subject</option>' + data.map(item => `
      <option value="${item.Subject}">${item.Subject}</option>
    `).join('');

    // Populate slot types based on the selected subject
    subjectSelect.addEventListener('change', () => {
      const selectedSubject = subjectSelect.value;

      const selectedData = data.find(item => item.Subject === selectedSubject);

      if (selectedData) {
        slotTypeSelect.innerHTML = `
        <option value="">Select Slot Type</option>
          <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
        `;
      } else {
        slotTypeSelect.innerHTML = `
         <option value="">Select Slot Type</option>
        <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
          `;
      }
    })

    // const subjectdelete = document.getElementById('subjectdelete');
    // const slotTypeDelete = document.getElementById('slotTypeDelete');

    subjectdelete.addEventListener('change', ()=> {
      const selectedSubjectDelete = subjectdelete.value;
      const selectedSubjectDeleteData = data.find(item => item.Subject === selectedSubjectDelete);
      if (selectedSubjectDeleteData) {
        slotTypeDelete.innerHTML = `
        <option value="">Select Slot Type</option>
          <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
        `;
      } else {
        slotTypeDelete.innerHTML = `
         <option value="">Select Slot Type</option>
        <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
          `;
      }
    })

    subjectdelete.addEventListener('change', ()=> {
      const selectedSubjectDelete = subjectdelete.value;
      const selectedSubjectDeleteData = data.find(item => item.Subject === selectedSubjectDelete);
      if (selectedSubjectDeleteData) {
        slotTypeDelete.innerHTML = `
        <option value="">Select Slot Type</option>
          <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
        `;
      } else {
        slotTypeDelete.innerHTML = `
         <option value="">Select Slot Type</option>
        <option value="Practical">Practical</option>
          <option value="Theory">Theory</option>
          <option value="Total">Total</option>
          `;
      }
    }
  );
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
}

// Handle form submission for updating attendance
document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    Subject: document.getElementById('subject').value,
    SlotType: document.getElementById('slotType').value,
    Present: parseInt(document.getElementById('present').value),
    Absent: parseInt(document.getElementById('absent').value),
    password: document.getElementById('passwordForUpdate').value
  };

  try {
    const response = await fetch(`${baseUrl}/up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.status === 200) {
      alert('Updated successfully!');
      fetchData();
    } else {
      alert('Unable to update data. check your password and make sure your token is not expired');
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
});

// Admin: Add new subject
document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  let formData = {
    Sr: parseInt(e.target.sr.value),
    Subject: e.target.subject.value,
    SlotType: e.target.slotType2.value,
    Conducted: parseInt(e.target.conducted.value),
    Present: parseInt(e.target.present.value),
    Absent: parseInt(e.target.absent.value),
    AttendancePercentage: e.target.attendancePercentage.value,
    password: e.target.passwordforAddOne.value
  };

  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.status === 200) {
      alert('Added successfully!');
      fetchSubjects();
      fetchData();
      closeAddModal();
    } else {
      alert('Unable to Add data. check your password and make sure your token is not expired');
    }
  } catch (error) {
    console.error('Error adding data:', error);
  }
});




//delete one function
document.getElementById('deleteform').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    Subject: document.getElementById('subjectdelete').value,
    SlotType: document.getElementById('slotTypeDelete').value,
    password: document.getElementById('passwordforDeleteOne').value
  };

  try {
    const response = await fetch(`${baseUrl}/deleteone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = response.json();
    if (response.status === 200) {
        alert('Deleted successfully!');
      fetchData();
      document.getElementById('closedeleteone').click()
    } else {
      if(data.mess) {
             alert(data.mess)
      } else {

        alert('Unable to delete data. check your password and make sure your token is not expired');
      }
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
});
// Admin: Delete all data
async function deleteData() {
  const password = document.getElementById('adminPassword').value;
  if (!password) return alert('Please enter admin password.');

  try {
    const response = await fetch(`${baseUrl}/del`, {
      method: 'POST',
      headers: { 'api': password },
    });

    if (response.status === 200) {
      alert('All data deleted successfully!');
      fetchData();
      closeDeleteModal();
    } else {
      alert('Unable to delete data.');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}



// Modal functions
function openAddModal() {
  document.getElementById('addModal').classList.remove('hidden');
}

function closeAddModal() {
  document.getElementById('addModal').classList.add('hidden');
}

function openDeleteModal() {
  document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.add('hidden');
}


function deleteOneModel() {
  document.getElementById('deleteone').classList.remove('hidden');
}


function deleteOneModelClose() {
  document.getElementById('deleteone').classList.add('hidden');
}
const logOutButton = document.getElementById('logout');
const logOut = async () => {
  const responce = await fetch(`${baseUrl}/user/logout`);
  const data = await responce.json();

  if (data.redirect) {
    // alert("LogOut successfully")
    window.location.href = data.redirect; // Redirect manually
  } else {
    alert("Unable to logOut");
  }


}

logOutButton.addEventListener('click', logOut);