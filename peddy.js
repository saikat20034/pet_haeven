// fetch and show all card on homepage
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

window.addEventListener('click', e => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add('hidden');
  }
});


const loadIcon = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then(res => res.json())
    .then(data => displayIcon(data.categories))
    .catch(error => console.log(error));
};

const displayIcon = (categories) => {

  let val = document.getElementById('category');
  categories.forEach(category => {
    const card = document.createElement('div');
    card.classList = 'card bg-base-100 w-90';
    card.innerHTML = `<button
            id='${category.category}'
            onclick="loadCatagories('${category.category}')"
            class="bg-white w-[280px] border-2 border-slate-200 text-xl text-black font-bold p-6 rounded-lg flex items-center justify-center gap-4"
          >
          <img src='${category.category_icon}'/>
            <span>${category.category}</span>
          </button>`;
    val.append(card);
  });
}



const loadCatagories = (categories) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${categories}`)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data))
    .catch((error) => console.log(error));
};

const loadAll = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllpets(data.pets))
    .catch((error) => console.log(error));
};

const displayAllpets = (pets) => {
  const petsContainer = document.getElementById("left-cards");
  petsContainer.innerHTML = ``;
  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 w-90";
    card.innerHTML = `
      <div class="border border-2 rounded-xl p-5">
        <figure class="">
          <img src=${
            pet['image']
          } class="h-52 object-cover w-full rounded-xl" />
        </figure>
        <div>
          <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${
            pet.breed || 'No Data Available'
          }</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${
            pet.date_of_birth || 'No Data Available'
          }</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${
            pet.gender || 'No Data Available'
          }</p>
          <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${
            pet.price || 'No Data Available'
          }</p>
          <div class="card-actions">
            <button class="btn btn-primary1" onclick="likePet('${pet.image}')">
              <img class="w-[20px]" src="./images/like.png" alt=""/>
            </button>
            <button id='${'pet' + pet.petId}'
            onclick="OpenDetailsModal2('${'pet' + pet.petId}')"
            class="btn btn-primary2 text-[#0E7A81] font-bold">Adopt</button>
            <button  onclick="OpenDetailsModal(${
              pet.petId
            })" class="btn btn-primary3 text-[#0E7A81] font-bold">Details</button>
          </div>
        </div>
      </div>
    `;
    petsContainer.append(card);
  });
};
const modal = document.getElementById('my_modal_1');
const modal2 = document.getElementById('my_modal_2');

const isSureToAdopt = AdoptBtn => {
  AdoptBtn.disabled = true;
  AdoptBtn.textContent = `Adopted`;


};

const OpenDetailsModal2 = (id) => {
  const AdoptBtn = document.getElementById(id);
  modal2.classList.add('modal-open');
  adoptData()
 for (let i = 3; i >= 1; i--) {
   setTimeout(function () {
     const countDiv = document.getElementById('countdown');
     countDiv.innerHTML = `<p class='text-black font-black text-2xl text-center'>${
       i - 1
     }</p>`;// Output the countdown number
   }, (4 - i) * 1000); // Delay based on the countdown step (1 second for each)
 }
  setTimeout(function () {
    isSureToAdopt(AdoptBtn)
    modal2.classList.remove('modal-open');
  }, 3000);

};

//deatilsModal
const OpenDetailsModal = (id) => {
  modal.classList.add('modal-open')
  singlePetDetails(id)
}

const CloseDetailsModal = () => {
  modal.classList.remove('modal-open');
};
const CloseDetailsModal2 = () => {
  modal2.classList.remove('modal-open');
};

const singlePetDetails = (id) => {

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => petData(data.petData))
    .catch(error => console.log(error));
}

const petData = (pet) => {

  const modalShowDiv = document.getElementById('detailsModal');
  modalShowDiv.innerHTML=``
  const card = document.createElement('div');
  card.innerHTML = `<img class="w-full rounded-lg" src='${pet.image}' />

         <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
         <div class="flex">
         <div>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${
            pet.breed || 'No Data Available'
          }</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${
            pet.gender || 'No Data Available'
          }</p>


          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Vaccinated status: ${
            pet.vaccinated_status || 'No Data Available'
          }</p>
         </div>
          <div>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${
            pet.date_of_birth || 'No Data Available'
          }</p>

          <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${
            pet.price || 'No Data Available'
          }</p>
          </div>
         </div>
          <p class="flex mt-[10px] mb-[16px]">Details: ${pet.pet_details}</p>
          <div class="modal-action">
            <form class="w-full" method="dialog">
              <button class="btn text-white w-full bg-[#0E7A81]" onclick="CloseDetailsModal()">Cancel</button>
            </form>
          </div>`;
  modalShowDiv.append(card);
 console.log(pet)
}

const adoptData = adopt => {
  const modalShowDiv = document.getElementById('detailsModal2');
  modalShowDiv.innerHTML = ``;
  const card = document.createElement('div');
  card.innerHTML = `
         <div class=" grid justify-items-center">
         <img class=" w-[100px] mr-[8px] mb-[8px]" src="./images/handshake.png" alt="">
         <h2 class="text-2xl font-black">Congratulations</h2>
         <p class=" text-base font-bold">Adoption Process For Your Pet Start </p>
         </div>
         <div id="countdown"><p class="text-black font-black text-2xl text-center">3</p>
         </div>
          <div class="modal-action">
            <form class="w-full" method="dialog">
            <button id='cancelBtn' class="btn text-white w-full bg-[#0E7A81]"
            onclick="CloseDetailsModal2()">Cancel</button>
            </form>
          </div>`;
  modalShowDiv.append(card);
};



// Function to handle liking pets
const likePet = (image) => {
  const likedContainer = document.getElementById("right-cards");
  const likedPet = document.createElement("div");
  likedPet.classList = 'p-2 w-[130px] h-[100px]';
  likedPet.innerHTML = `<img src="${image}" class="w-full rounded-xl h-full object-cover" />`;
  likedContainer.appendChild(likedPet);
};

// Existing category and sort functions
const displayCatagories = (category) => {
  const btn1 = document.getElementById('Cat');
  const btn2 = document.getElementById('Dog');
   const btn3 = document.getElementById('Rabbit');
  const btn4 = document.getElementById('Bird');
  btn1.classList.remove('bg-gray-200')
  btn2.classList.remove('bg-gray-200')
  btn3.classList.remove('bg-gray-200')
  btn4.classList.remove('bg-gray-200')
  if (category.length) {
    const btn = document.getElementById(category[0].category)
    btn.classList.remove('bg-white')
    btn.classList.add('bg-gray-200')
    console.log(btn)
  }
  else {
     btn4.classList.add('bg-gray-200');
  }
  let val = document.getElementById("loading");
  spinner()
  val.classList.remove("hidden");
  setTimeout(function () {
    val.classList.add("hidden");
    const petsContainer = document.getElementById("left-cards1");
    petsContainer.innerHTML = ``;
    const petsContainer1 = document.getElementById("left-cards");
    petsContainer.classList.remove("hidden");
    petsContainer1.classList.add("hidden");
    if (category.length) {
      category.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card bg-base-100 w-90";
        card.innerHTML = `
          <div class="border border-2 rounded-xl p-5">
            <figure class="">
              <img src=${
                pet['image']
              } class="h-52 object-cover w-full rounded-xl" />
            </figure>
            <div>
              <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${
                pet.pet_name
              }</h2>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${
                pet.breed || 'No Data Available'
              }</p>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${
                pet.date_of_birth || 'No Data Available'
              }</p>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${
                pet.gender || 'No Data Available'
              }</p>
              <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${
                pet.price || 'No Data Available'
              }</p>
              <div class="card-actions">
                <button class="btn btn-primary1" onclick="likePet('${
                  pet.image
                }')">
                  <img class="w-[20px]" src="./images/like.png" alt=""/>
                </button>
                <button class="btn btn-primary2 text-[#0E7A81] font-bold">Adopt</button>
                <button class="btn btn-primary3 text-[#0E7A81] font-bold">Details</button>
              </div>
            </div>
          </div>
        `;
        petsContainer.append(card);
      });
    } else {
      petsContainer.innerHTML = `<div class="bg-gray-200 md:w-[1000px] w-[200px] rounded-3xl text-center">
        <img class="mx-auto mt-[100px] mb-[50px]" src="./images/no-data 1.png" alt=""/>
        <h2 class="font-bold text-[32px] mb-[30px]">No Information Available</h2>
        <p class="text-base mb-[100px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      </div>`;
    }
  }, 3000);
};

// Sort by price function
const sortByPrice = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      let value = data.pets;
      let filterValue = value.sort((a, b) => a.price - b.price);
      displayAllpets(filterValue);
    })
    .catch((error) => console.log(error));
  let val = document.getElementById("loading");
  const container1 = document.getElementById('left-cards1');
  spinner()
  val.classList.remove("hidden");
  setTimeout(function () {
    val.classList.add("hidden");
    container1.classList.add('hidden');
  }, 3000)
}

// Spinner function
const spinner = () => {
  const container1 = document.getElementById('left-cards1');
  const container2 = document.getElementById('left-cards');
  const container3 = document.getElementById('right-cards');
  container1.classList.add('hidden')
  container2.classList.add('hidden');
  container3.classList.add('hidden');
  setTimeout(function () {
       container1.classList.remove('hidden');
       container2.classList.remove('hidden');
       container3.classList.remove('hidden');
  }, 3000);
};

loadAll();
loadIcon()