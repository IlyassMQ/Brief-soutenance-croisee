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
const company = document.getElementById("company").value.trim();
const role = document.getElementById("role").value.trim();



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

addBtn.addEventListener("click", function(e){
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;
    e.preventDefault();
    if (!Validation()) return;
    const card = document.createElement("div");
        card.className="flex items-center border border-gray-200 rounded-xl p-4 bg-white w-[250px]"
     card.innerHTML = `
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                 <img src="" alt="">  <!-- employe image -->
         </div>
        <div class="ml-3">
            <p class="font-semibold text-gray-800">${name}</p>
            <p class="text-gray-500 text-sm">${role}</p>
        </div>
        <button class="ml-7 text-yellow-500 text-sm">Edit</button>
    `;
    stafCards.appendChild(card);
    modal.classList.add("hidden");
    document.getElementById("addWorkerForm").reset();
})

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
