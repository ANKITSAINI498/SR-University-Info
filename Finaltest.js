
const profileCards = document.getElementById("profileCards");
const alertMsg = document.getElementById("alertMsg");
let profileData = [];
let darkMode = false;


function createProfile() {
  const name = document.getElementById("name").value.trim();
  const fname = document.getElementById("fname").value.trim();
  const course = document.getElementById("course").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const year = document.getElementById("year").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const gender = document.getElementById("gender").value;
  const city = document.getElementById("city").value;
  const photoUrl = document.getElementById("photoUrl").value.trim();
  const photoFile = document.getElementById("photoFile").files[0];
  const subject = document.getElementById("subject").value.trim().split(",");
  const play = document.getElementById("play").value.trim().split(",");
  const bio = document.getElementById("bio").value.trim();

  const Education = [];
  if (document.getElementById("hobby1").checked) Education.push("Online");
  if (document.getElementById("hobby2").checked) Education.push("Offline");
  if (document.getElementById("hobby3").checked) Education.push("Self Stady");

  if (!name || !fname || !course || !branch || !year || !subject|| !play|| !email || !age || !gender || !city) {
    showAlert("❌ All fields are required!", "danger");
    return;
  }

  // let photo;
  // if (photoFile) {
  //   photo = URL.createObjectURL(photoFile);
  // } else if (photoUrl) {
  //   photo = photoUrl;
  // } else {
  //   photo = "https://via.placeholder.com/300";
  // }

  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const photo = e.target.result; // base64 string ban gaya
      saveProfile(photo); // naya function call
    };
    reader.readAsDataURL(photoFile); // base64 banane ke liye
  } else {
    const photo = photoUrl || "https://via.placeholder.com/300";
    saveProfile(photo);
  }

  const profile = { name, fname, course, branch, year, subject, play, email, age, gender, city, photo, bio, Education,};
  profileData.push(profile);
  saveToLocalStorage();
  renderProfiles(profileData);
  showAlert("✅ Profile Created Successfully!", "success");
  document.getElementById("userForm").reset();
}

function saveProfile(photo) {
  const name = document.getElementById("name").value.trim();
  const fname = document.getElementById("fname").value.trim();
  const course = document.getElementById("course").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const year = document.getElementById("year").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const gender = document.getElementById("gender").value;
  const city = document.getElementById("city").value;
  const subject = document.getElementById("subject").value.trim().split(",").filter(Boolean);
  const play = document.getElementById("play").value.trim().split(",").filter(Boolean);
  const bio = document.getElementById("bio").value.trim();

  const Education = [];
  if (document.getElementById("hobby1").checked) Education.push("Online");
  if (document.getElementById("hobby2").checked) Education.push("Offline");
  if (document.getElementById("hobby3").checked) Education.push("Self Stady");

  if (!name || !fname || !course || !branch || !year || !subject.length || !play.length || !email || !age || !gender || !city) {
    showAlert("❌ All fields are required!", "danger");
    return;
  }

  const profile = { name, fname, course, branch, year, subject, play, email, age, gender, city, photo, bio, Education };
  profileData.push(profile);
  saveToLocalStorage();
  renderProfiles(profileData);
  showAlert("✅ Profile Created Successfully!", "success");
  document.getElementById("userForm").reset();
}



function renderProfiles(data) {
  profileCards.innerHTML = "";

  data.forEach((profile, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
    
      <div class="card mb-3 shadow-sm ${darkMode ? 'bg-black text-black' : ''}">
      <center><h1 class="card-title">SitaRam University</h1></center>
        <center><img src="${profile.photo}" class="card-img-top" onerror="this.src='https://via.placeholder.com/300'" "></center>
        <div class="card-body">
          <center><h3 class="card-name">${profile.name}</h3></center>
          <p class="card-text">${profile.bio}</p>
          <p><strong>Father's Name:</strong> ${profile.fname}</p>
          <p><strong>Course:</strong> ${profile.course} | <strong>Branch:</strong> ${profile.branch}</p>
          <p><strong>Academic Year:</strong> ${profile.year}</p>
          <p><strong>Gender:</strong> ${profile.gender} | <strong>Age:</strong> ${profile.age}</p>
          <p><strong>City:</strong> ${profile.city} , <b>Rajasthan</b></p>
          <p><strong>Additional Subjcet:</strong> ${profile.subject}</p>
          <p><strong>Sports Play:</strong> ${profile.play}</p>
          <p><strong>Education Mode:</strong> ${profile.Education}</p>
          <p><strong>Email:</strong> ${profile.email}</p>

          <div class="d-flex flex-wrap gap-4 mt-1">
            <button onclick="removeProfile(${index})" class="btn btn-sm btn-danger">Delete</button>
            <button onclick="editProfile(${index})" class="btn btn-sm btn-warning">Edit</button>
            <button onclick="downloadProfile(${index})" class="btn btn-sm btn-outline-success">Download</button>
            <button onclick="copyEmail('${profile.email}')" class="btn btn-sm btn-outline-primary">📋 Copy Email</button>
          </div>

          <div class="form-check mt-2">
            <input type="checkbox" class="form-check-input" onchange="markFavorite(this)" id="fav${index}">
            <label for="fav${index}" class="form-check-label">⭐ Favorite</label>
          </div>
        </div>
      </div>
    `;
    profileCards.appendChild(col);
  });

  
  alertMsg.innerHTML = `<div class="alert alert-info mt-3">Total Profiles: ${profileData.length}</div>`;
}


function removeProfile(index) {
  profileData.splice(index, 1);
  saveToLocalStorage();
  renderProfiles(profileData);
  showAlert("❌ Profile Removed", "warning");
}

function editProfile(index) {
  const p = profileData[index];
  document.getElementById("name").value = p.name;
  document.getElementById("fname").value = p.fname;
  document.getElementById("course").value = p.course;
  document.getElementById("branch").value = p.branch;
  document.getElementById("year").value = p.year;
  document.getElementById("email").value = p.email;
  document.getElementById("age").value = p.age;
  document.getElementById("gender").value = p.gender;
  document.getElementById("city").value = p.city;
  document.getElementById("subject").value = p.subject.join(",");
  document.getElementById("play").value = p.play.join(",");
  document.getElementById("bio").value = p.bio;
  
  document.getElementById("hobby1").checked = p.Education.includes("Online");
  document.getElementById("hobby2").checked = p.Education.includes("Offline");
  document.getElementById("hobby3").checked = p.Education.includes("Self Stady");

  removeProfile(index);
  showAlert("✏️ Now Edit and Resubmit", "info");
}


function showAlert(message, type) {
  alertMsg.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => (alertMsg.innerHTML = ""), 3000);
}


function searchProfiles() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const filtered = profileData.filter(p => p.name.toLowerCase().includes(keyword));
  renderProfiles(filtered);
}


function sortProfiles() {
  const sortBy = document.getElementById("sortBy").value;
  if (sortBy === "name") {
    profileData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "age") {
    profileData.sort((a, b) => a.age - b.age);
  }else if (sortBy === "course") {
    profileData.sort((a, b) => a.course - b.course);
  }else if (sortBy === "branch") {
    profileData.sort((a, b) => a.branch - b.branch);
  }
  renderProfiles(profileData);
}


function downloadProfile(index) {
  const p = profileData[index];
  const content = `
Name: ${p.name}
Father Name: ${p.fname}
Course: ${p.course}
Branch: ${p.branch}
Academic Year: ${p.year}
Email: ${p.email}
Age: ${p.age}
City: ${p.city}
Gender: ${p.gender}
Additional Subject: ${p.subject.join(", ")}
Sports Play: ${p.play.join(", ")}
Education Mode: ${p.Education.join(", ")}
Bio: ${p.bio}
  `;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.name}_profile.txt`;
  a.click();
}


function copyEmail(email) {
  navigator.clipboard.writeText(email);
  showAlert("📋 Email copied to clipboard!", "info");
}


function markFavorite(el) {
  el.closest(".card").classList.toggle("border-warning");
}


function toggleTheme() {
  document.body.classList.toggle("bg-black");
  document.body.classList.toggle("text-black");
  darkMode = !darkMode;
  renderProfiles(profileData);
}


function saveToLocalStorage() {
  localStorage.setItem("profiles", JSON.stringify(profileData));
}


function loadFromLocalStorage() {
  const data = localStorage.getItem("profiles");
  if (data) {
    profileData = JSON.parse(data);
    renderProfiles(profileData);
  }
}




window.onload = loadFromLocalStorage;
