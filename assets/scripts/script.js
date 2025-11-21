    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("add-emp");
    const closeModalBtn = document.querySelectorAll(".closeModal");
    const addBtn = document.getElementById("add");
    const addExpBtn = document.getElementById("add-ex")
    const delAllBtn = document.getElementById("dell-emp")

    openModalBtn.onclick = () => {
        modal.classList.remove("hidden");
    };

    closeModalBtn.forEach(btn =>{
        btn.addEventListener("click",()=>{
            modal.classList.add("hidden");
            document.getElementById("addWorkerForm").reset();
        })
    })
    delAllBtn.onclick = () =>{
        localStorage.clear();
        window.location.reload()
    }
// ==============Validaation===========
const errorsSpan =document.querySelectorAll(".form-error") ;
// dynamique form
const company = document.querySelector(".company").value.trim();
const role = document.querySelector(".role").value.trim();



function Validation(){
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
// REEGEX
const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+212[5-7][0-9]{8}$/
let isValid = true;
errorsSpan.forEach(span => (span.textContent = ""));
  if (name === "") {
    errorsSpan[0].textContent = "Name is required.";
    errorsSpan[0].classList.add("text-red-500");
    isValid = false;
  } else if (!nameRegex.test(name)) {
    errorsSpan[0].textContent = "The name must contain only letters";
    errorsSpan[0].classList.add("text-red-500");
    isValid = false;
  }
  if (email === "") {
    errorsSpan[1].textContent = "Email is required";
    errorsSpan[1].classList.add("text-red-500");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    errorsSpan[1].textContent = "Please enter a valid email, e.g., example@mail.com";
    errorsSpan[1].classList.add("text-red-500");
    isValid = false;
  }
  if (phone === "") {
    errorsSpan[2].textContent = "Phone is required";
    errorsSpan[2].classList.add("text-red-500");
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    errorsSpan[2].textContent = "Please enter a valid Phone, e.g., +21266666666";
    errorsSpan[2].classList.add("text-red-500");
    isValid = false;
  }
 // ==== Experience dates validation for all experiences ====
const fromDates = document.querySelectorAll(".date-start");
const toDates = document.querySelectorAll(".date-end");
const errorsSpanEx = document.querySelectorAll(".form-error-ex")

for (let i = 0; i < fromDates.length; i++) {
    const from = fromDates[i].value;
    const to = toDates[i].value;

    // Clear previous error
    errorsSpanEx[i].textContent = "";

    // Only validate if both dates are filled
    if (from && to && from > to) {
        errorsSpanEx[i].textContent = "from date is bigger than to date.";
        errorsSpanEx[i].classList.add("text-red-500");
        isValid = false;
    }
}


  return isValid;

}

const stafCards = document.getElementById("staf-cards")
const viewModal = document.getElementById("viewModal");
const closeViewBtn = document.getElementById("closeView");


    closeViewBtn.addEventListener("click", function() {
    viewModal.classList.add("hidden");
    });

addBtn.addEventListener("click", function(e){
    e.preventDefault();
    if (!Validation()) return;
    const id = toLocalStorage();
    displayWorkersInSidebar();
    modal.classList.add("hidden");
    document.getElementById("addWorkerForm").reset();
});

// =========Dynamique form======
addExpBtn.addEventListener("click",function(){
  const dForme = document.getElementById("new-dynamique-form");
  
  const newForme = document.createElement("div");
  newForme.className="bg-gray-100 w-full max-h-full border-black rounded-xl ex-form"
  newForme.innerHTML = `<div>
                        <label>Company :</label>
                        <input type="text" class="company" >
                        <span class="text-xs h-5px"></span>
                    </div>
                    <div>
                        <label>Role :</label>
                        <input type="text" class="role" >
                        <span class="text-xs h-5px"></span>
                    </div>
                    <div>
                        <label>From :</label>
                        <input type="date" class="date-start form-error-ex">
                        <span class="form-error-ex text-xs"></span>
                        
                    </div>
                    <div>
                        <label>To :</label>
                        <input type="date" class="date-end form-error-ex">
                        <span class="form-error-ex text-xs"></span>
                        
                    </div>

                    <div><button type="button" class="del-ex w-auto bg-red-600 text-white py-3 rounded-xl mt-2"> Delete Experience</button></div>`;
   dForme.appendChild(newForme);  
 

})
  const delExBtn = document.querySelectorAll(".del-ex")

    // delExBtn.addEventListener("click",function(){
    //     dForme.classList.add("hidden");
    //     dForme.reset();

    // })
// ===================localStorage=============


function toLocalStorage() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const photo = document.getElementById("photo-url").value.trim();

    // EXPERIENCE forms
    const companies = document.querySelectorAll(".company");
    const roles = document.querySelectorAll(".role");
    const datesStart = document.querySelectorAll(".date-start");
    const datesEnd = document.querySelectorAll(".date-end");

    const experiencesArr = [];

        for (let i = 0; i < companies.length; i++) {
        experiencesArr.push({
            company: companies[i].value.trim(),
            role: roles[i].value.trim(),
            from: datesStart[i].value,
            to: datesEnd[i].value
        });
      };
      const id = Date.now();
    // Create employee object
    const employe = {
        id :id,
        name: name,
        email: email,
        phone: phone,
        role: role,
        img:photo,
        experiences: experiencesArr
    };
        // Get old employees
    let oldData = JSON.parse(localStorage.getItem("employees") || "[]");

    // Add new one
    oldData.push(employe);

    // Save again
    localStorage.setItem("employees", JSON.stringify(oldData));
    return id ;
}
// ==========For photo url=======
const photoUrlInput = document.getElementById("photo-url");
const photoPreview = document.getElementById("photo-preview");

photoUrlInput.addEventListener("input", function() {
    const url = photoUrlInput.value.trim();
    if(url) {
        photoPreview.style.backgroundImage = `url(${url})`;
        photoPreview.style.backgroundSize = "cover";
        photoPreview.style.backgroundPosition = "center";
        photoPreview.textContent = ""; // remove text
    } else {
        photoPreview.style.backgroundImage = "";
        photoPreview.textContent = "Picture";
    }
});


// =============load workers for assign
function loadWorkers(room) {
    const list = document.getElementById("assign-list");
    list.innerHTML = "";

    let allEmployees = JSON.parse(localStorage.getItem("employees") || "[]");

    const allowed = Room_Rules[room] || [];
    const filteredEmployees = [];

    for (let i = 0; i < allEmployees.length; i++) {
        const emp = allEmployees[i];

        const roleAllowed = allowed.includes(emp.role);

        const notAssigned = !emp.assignedRoom;

        if (roleAllowed && notAssigned) {
            filteredEmployees.push(emp);
        }
    }

    if (filteredEmployees.length === 0) {
        list.innerHTML = `<p class="text-red-500 text-center">No workers available</p>`;
        return;
    }

    for (let i = 0; i < filteredEmployees.length; i++) {
    const emp = filteredEmployees[i];

    const card = document.createElement("div");
    card.className = "flex items-center border border-gray-200 rounded-xl p-3 bg-white cursor-pointer";

    card.innerHTML = `
        <div>
          <img src="${emp.img}" alt="${emp.name}" class ="w-10 h-10 rounded-full"></img>
        </div>
        <div class="ml-3">
            <p class="font-semibold text-gray-800">${emp.name}</p>
            <p class="text-sm text-red-500">${emp.role}</p>
        </div>
    `;

    card.addEventListener("click", function () {
        const roomDiv = document.querySelector(`div[data-room="${room}"]`);
        if (!roomDiv) return;

        const miniCard = document.createElement("div");
        miniCard.className = "miniCard flex items-center gap-2 bg-gray-200 p-1 rounded my-1 text-xs";
        miniCard.innerHTML = `
            <img src="${emp.img}" alt="${emp.name}" class="w-12 h-12 rounded-full object-cover">
            <div class="flex flex-col">
                <strong class="text-sm">${emp.name}</strong>
                <span class="text-xs text-gray-600">${emp.role}</span>
            </div>
            <div>
                <button class="removeBtn bg-red-500 h-4 w-4 rounded">
                    <i class="fa-solid fa-x" style="color:#fff;"></i>
                </button>
            </div>
        `;

        roomDiv.appendChild(miniCard);
        checkRoomStatuses();

        // Make employe assigned and save to localStorage
        emp.assignedRoom = room;
        saveEmployeesToLocalStorage(allEmployees);

        // remove from sidebar
        const sidebarCard = document.querySelector(`div[data-id="${emp.id}"]`);
        if (sidebarCard) sidebarCard.remove();

        // remove button function
        const removeBtn = miniCard.querySelector(".removeBtn");
        removeBtn.addEventListener("click", function() {
            miniCard.remove();
            emp.assignedRoom = null;
            saveEmployeesToLocalStorage(allEmployees);
            backEmployeeToSidebar(emp);
            checkRoomStatuses();
        });

        // Close modal
        cardesToassign.classList.add("hidden");
    });

    list.appendChild(card);
}};

//================save all employees to localStorage
function saveEmployeesToLocalStorage(allEmployees) {
    localStorage.setItem("employees", JSON.stringify(allEmployees));
}



// =================== display workers in the SideBar=============
function displayWorkersInSidebar() {
    const stafCards = document.getElementById("staf-cards");
    stafCards.innerHTML = "";

    const allEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    for (let i = 0; i < allEmployees.length; i++) {
        const emp = allEmployees[i];

        const card = document.createElement("div");
        card.className = "flex items-center border border-gray-200 rounded-xl p-4 bg-white w-[250px]";
        card.dataset.id = emp.id;

        card.innerHTML = `
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                <img src="${emp.img}" alt="${emp.name}">
            </div>
            <div class="ml-3">
                <p class="font-semibold text-gray-800">${emp.name}</p>
                <p class="text-gray-500 text-sm">${emp.role}</p>
            </div>
            <button class="ml-7 text-yellow-500 text-sm">Edit</button>
        `;

        // click open modal worker info
        card.addEventListener("click", function() {
            viewModal.classList.remove("hidden");
            document.getElementById("view-name").textContent = emp.name;
            document.getElementById("view-email").textContent = emp.email;
            document.getElementById("view-phone").textContent = emp.phone;
            document.getElementById("view-role").textContent = emp.role;
            const profileImgDiv = document.querySelector(".image-employer");
            profileImgDiv.innerHTML = `<img src="${emp.img}" alt="${emp.name}" class="h-12 w-12 rounded-full object-cover">`;

            const expModalDiv = document.getElementById("view-experiences");
            expModalDiv.innerHTML = "";
            for (let j = 0; j < emp.experiences.length; j++) {
                const ex = emp.experiences[j];

                const exCard = document.createElement("div");
                exCard.className = "p-2 bg-gray-100 rounded";
                exCard.innerHTML =
                    `<p><strong>Company:</strong> ${ex.company}</p>
                     <p><strong>Role:</strong> ${ex.role}</p>
                     <p><strong>From:</strong> ${ex.from}</p>
                     <p><strong>To:</strong> ${ex.to}</p>`;

                expModalDiv.appendChild(exCard);
            }
        });

        stafCards.appendChild(card);
    }
}

window.addEventListener("DOMContentLoaded", displayWorkersInSidebar);



const cardesToassign = document.getElementById("assign-cardes");
const plusBtns = document.querySelectorAll(".plus-btn");

plusBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        const room = btn.dataset.room;   // get room name
        cardesToassign.classList.remove("hidden");
        loadWorkers(room);   // load workers for the room only
    });
});


const closeModalAssignBtn = document.getElementById("closeModal-Assign");
closeModalAssignBtn.addEventListener("click",function(){
  cardesToassign.classList.add("hidden")
})

const Room_Rules = {
    "Conference Room": ["IT Guy", "Receptionist", "Other", "Manager", "Cleaning"],
    "Servers Room": ["IT Guy", "Manager", "Cleaning"],
    "Security Room": ["Security", "Manager", "Cleaning"],
    "Reception": ["Receptionist", "Manager", "Cleaning", "Other"],
    "Staff Room": ["IT Guy", "Receptionist", "Security", "Cleaning", "Other", "Manager"],
    "Vault": ["Security", "Manager"]
};


// ==============For the employe back to sidebar=======
function backEmployeeToSidebar(emp) {
    const stafCards = document.getElementById("staf-cards");

    // Check if employee already in sidebar
    if (document.querySelector(`div[data-id="${emp.id}"]`)) return;

    const card = document.createElement("div");
    card.className = "flex items-center border border-gray-200 rounded-xl p-4 bg-white w-[250px]";
    card.dataset.id = emp.id;

    card.innerHTML = `
        <div class="flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            <img src="${emp.img}" alt="${emp.name}" class="w-12 h-12">
        </div>
        <div class="ml-3">
            <p class="font-semibold text-gray-800">${emp.name}</p>
            <p class="text-gray-500 text-sm">${emp.role}</p>
        </div>
        <button class="ml-7 text-yellow-500 text-sm">Edit</button>
    `;

    card.addEventListener("click", function() {
        viewModal.classList.remove("hidden");
        document.getElementById("view-name").textContent = emp.name;
        document.getElementById("view-email").textContent = emp.email;
        document.getElementById("view-phone").textContent = emp.phone;
        document.getElementById("view-role").textContent = emp.role;
        const profileImgDiv = document.querySelector(".image-employer");
        profileImgDiv.innerHTML = `<img src="${emp.img}" alt="${emp.name}" class="h-12 w-12 rounded-full object-cover">`;

        const expModalDiv = document.getElementById("view-experiences");
        expModalDiv.innerHTML = "";
        for (let i = 0; i < emp.experiences.length; i++) {
            const ex = emp.experiences[i];
            const exCard = document.createElement("div");
            exCard.className = "p-2 bg-gray-100 rounded";
            exCard.innerHTML =
                `<p><strong>Company:</strong> ${ex.company}</p>
                 <p><strong>Role:</strong> ${ex.role}</p>
                 <p><strong>From:</strong> ${ex.from}</p>
                 <p><strong>To:</strong> ${ex.to}</p>`;
            expModalDiv.appendChild(exCard);
        }
    });

    stafCards.appendChild(card);
}

function checkRoomStatuses() {
    const rooms = document.querySelectorAll(".rooms");

    rooms.forEach(room => {
        // Count employees inside the room
        const hasEmployees = room.querySelectorAll(".miniCard").length > 0;

        if (!hasEmployees) {
            room.classList.add("room-empty");
        } else {
            room.classList.remove("room-empty");
        }
    });
}
window.addEventListener("DOMContentLoaded", checkRoomStatuses);


