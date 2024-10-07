// fetch and show all card on homepage
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
          <img src=${pet['image']} class="h-52 object-cover w-full rounded-xl" />
        </figure>
        <div>
          <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${pet.breed}</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${pet.date_of_birth}</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${pet.gender}</p>
          <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${pet.price}</p>
          <div class="card-actions">
            <button class="btn btn-primary1" onclick="likePet('${pet.image}')">
              <img class="w-[20px]" src="./images/like.png" alt=""/>
            </button>
            <button onclick="OpenDetailsModal2()" class="btn btn-primary2 text-[#0E7A81] font-bold">Adopt</button>
            <button  onclick="OpenDetailsModal(${pet.petId})" class="btn btn-primary3 text-[#0E7A81] font-bold">Details</button>
          </div>
        </div>
      </div>
    `;
    petsContainer.append(card);
  });
};
const modal = document.getElementById('my_modal_1');
const modal2 = document.getElementById('my_modal_2');

const OpenDetailsModal2 = id => {
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
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${pet.breed}</p>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${pet.gender}</p>


          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Vaccinated status: ${pet.vaccinated_status}</p>
         </div>
          <div>
          <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${pet.date_of_birth}</p>

          <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${pet.price}</p>
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
            <button class="btn text-white w-full bg-[#0E7A81]" onclick="CloseDetailsModal2()">Cancel</button>
            </form>
          </div>`;
  modalShowDiv.append(card);
};



// Function to handle liking pets
const likePet = (image) => {
  const likedContainer = document.getElementById("right-cards");
  const likedPet = document.createElement("div");
  likedPet.classList = "p-2 w-[130px] h-[100px]";
  likedPet.innerHTML = `<img src="${image}" class="w-full rounded-xl h-full object-cover" />`;
  likedContainer.appendChild(likedPet);
};

// Existing category and sort functions
const displayCatagories = (category) => {
  let val = document.getElementById("loading");
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
              <img src=${pet["image"]} class="h-52 object-cover w-full rounded-xl" />
            </figure>
            <div>
              <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/card.png" alt="">Breed: ${pet.breed}</p>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/calendar.png" alt="">Birth: ${pet.date_of_birth}</p>
              <p class="flex"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/gender.png" alt="">Gender: ${pet.gender}</p>
              <p class="flex mb-[16px]"> <img class="w-[20px] mr-[8px] mb-[8px]" src="./images/dollar.png" alt="">Price: ${pet.price}</p>
              <div class="card-actions">
                <button class="btn btn-primary1" onclick="likePet('${pet.image}')">
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
      petsContainer.innerHTML = `<div class="bg-gray-200 w-[1100px] rounded-3xl text-center">
        <img class="mx-auto mt-[200px] mb-[50px]" src="./images/no-data 1.png" alt=""/>
        <h2 class="font-bold text-[32px] mb-[30px]">No Information Available</h2>
        <p class="text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
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
};

// Spinner function
const spinner = () => {
  document.getElementById("loading").style.display = "block";
  setTimeout(function () {
    loadAll();
  }, 3000);
};

loadAll();
