    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("add-emp");
    const closeModalBtn = document.querySelectorAll(".closeModal");
    const addBtn = document.getElementById("add");
    const addExpBtn = document.getElementById("add-ex")

    openModalBtn.onclick = () => {
        modal.classList.remove("hidden");
    };

    closeModalBtn.forEach(btn =>{
        btn.addEventListener("click",()=>{
            modal.classList.add("hidden");
        })
    })
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
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;

    const card = document.createElement("div");
    card.className = "flex items-center border border-gray-200 rounded-xl p-4 bg-white w-[250px]";
    card.dataset.id = id; // store employee id

    card.innerHTML = `
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            <img src="" alt="">
        </div>
        <div class="ml-3">
            <p class="font-semibold text-gray-800">${name}</p>
            <p class="text-gray-500 text-sm">${role}</p>
        </div>
        <button class="ml-7 text-yellow-500 text-sm">Edit</button>
    `;

    card.addEventListener("click", function() {
        const allEmployers = JSON.parse(localStorage.getItem("employees") || "[]");
        const employee = allEmployers.find(function(emp) {
             return emp.id == id;
          });

        if (!employee) return;

        viewModal.classList.remove("hidden");
        document.getElementById("view-name").textContent = employee.name;
        document.getElementById("view-email").textContent = employee.email;
        document.getElementById("view-phone").textContent = employee.phone;
        document.getElementById("view-role").textContent = employee.role;

        const expModalDiv = document.getElementById("view-experiences");
        expModalDiv.innerHTML = "";

        for (let i = 0; i < employee.experiences.length; i++) {
          const ex = employee.experiences[i];
          const exCard = document.createElement("div");
          exCard.className = "p-2 bg-gray-100 rounded";
          exCard.innerHTML = 
              "<p><strong>Company:</strong> " + ex.company + "</p>" +
              "<p><strong>Role:</strong> " + ex.role + "</p>" +
              "<p><strong>From:</strong> " + ex.from + "</p>" +
              "<p><strong>To:</strong> " + ex.to + "</p>";
          expModalDiv.appendChild(exCard);
        };
    });

    stafCards.appendChild(card);
    modal.classList.add("hidden");
    document.getElementById("addWorkerForm").reset();
});

// =========Dynamique form======
addExpBtn.addEventListener("click",function(){
  const dForme = document.getElementById("new-dynamique-form");
  
  const newForme = document.createElement("div");
  newForme.className="bg-gray-100 w-full max-h-full border-black rounded-xl"
  newForme.innerHTML = `<div>
                        <label>Company :</label>
                        <input type="text" class="company" >
                        <span class="form-error-ex text-xs h-5px"></span>
                    </div>
                    <div>
                        <label>Role :</label>
                        <input type="text" class="role" >
                        <span class="form-error-ex text-xs h-5px"></span>
                    </div>
                    <div>
                        <label>From :</label>
                        <input type="date" class="date-start" >
                        
                    </div>
                    <div>
                        <label>To :</label>
                        <input type="date" class="date-end" >
                        
                    </div>`;
   dForme.appendChild(newForme);  

})

// ===================localStorage=============


function toLocalStorage() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;

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

