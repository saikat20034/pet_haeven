console.log('connected');

// fetch and show all card on hompage
const loadCatagories = categories => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${categories}`)
    .then(res => res.json())
    .then(data => displayCatagories(data.data))
    .catch(error => console.log(error));
};

const loadAll = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayAllpets(data.pets))
    .catch(error => console.log(error));
};
const displayAllpets = pets => {
  const petsContainer = document.getElementById('left-cards');
  petsContainer.innerHTML = ``;
  pets.forEach(pet => {
    console.log(pet);
    const card = document.createElement('div');
    card.classList = 'card bg-base-100 w-90';
    card.innerHTML = `
    <div class ="border border-2 rounded-xl p-5">
      <figure class="">
        <img src=${pet['image']}
          class="h-52 object-cover w-full rounded-xl" />
      </figure>

      <div>
      <div>
      <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
      <p class="flex"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/card.png" alt="">Breed: ${pet.breed}</p>
      <p class="flex"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/calendar.png" alt="">Birth: ${pet.date_of_birth}</p>
      <p class="flex">  <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/gender.png" alt="">Gender: ${pet.gender}</p>
      <p class="flex mb-[16px]"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/dollar.png" alt="">Price: ${pet.price}</p>
      </div>

        <div class="card-actions">
              <button class="btn btn-primary1"><img class = "w-[20px]" src="./images/like.png" alt=""/></button>
          <button class="btn btn-primary2 text-[#0E7A81] font-bold">Adopt</button>
          <button class="btn btn-primary3 text-[#0E7A81] font-bold">Details</button>
        </div>
      </div>
      </div>
      `;
    petsContainer.append(card);
  });
};

const displayCatagories = category => {
  let val = document.getElementById('loading');
  console.log(val);
  val.classList.remove('hidden');
  // document.getElementById('loading').classList.add = 'block';
  setTimeout(function () {
    val.classList.add('hidden');
    const petsContainer = document.getElementById('left-cards1');
    petsContainer.innerHTML = ``;
    const petsContainer1 = document.getElementById('left-cards');
    petsContainer.classList.remove('hidden');
    petsContainer1.classList.add('hidden');
    if (category.length) {
      category.forEach(pet => {
        console.log(pet);
        const card = document.createElement('div');
        card.classList = 'card bg-base-100 w-90';
        card.innerHTML = `
    <div class ="border border-2 rounded-xl p-5">
      <figure class="">
        <img src=${pet['image']}
          class="h-52 object-cover w-full rounded-xl" />
      </figure>

      <div>
      <div>
      <h2 class="mb-[16px] mt-[16px] text-xl font-bold">${pet.pet_name}</h2>
      <p class="flex"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/card.png" alt="">Breed: ${pet.breed}</p>
      <p class="flex"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/calendar.png" alt="">Birth: ${pet.date_of_birth}</p>
      <p class="flex">  <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/gender.png" alt="">Gender: ${pet.gender}</p>
      <p class="flex mb-[16px]"> <img class = "w-[20px] mr-[8px] mb-[8px] text-base" src="./images/dollar.png" alt="">Price: ${pet.price}</p>
      </div>

        <div class="card-actions">
              <button class="btn btn-primary1"><img class = "w-[20px]" src="./images/like.png" alt=""/></button>
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
    <img class = " mx-auto mt-[200px] mb-[50px] " src="./images/no-data 1.png" alt=""/>
    <h2 class="font-bold text-[32px] mb-[30px]">No Information Available</h2>
    <p class="text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
      its layout. The point of using Lorem Ipsum is that it has a.</p>
     </div>`;
    }
  }, 3000);
};

const sortByPrice = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
      let value = data.pets;
      let filterValue = value.sort((a, b) => a.price - b.price);

      displayAllpets(filterValue);
    })
    .catch(error => console.log(error));
};

const spinner = () => {
  document.getElementById('loading').style.display = 'block';
  setTimeout(function () {
    loadAllPets();
  }, 3000);
};


// const likePet = image => {
//   const likedContainer = document.getElementById('right-cards');
//   const likedPet = document.createElement('div');
//   likedPet.classList = 'p-2 w-[130px] h-[100px]';
//   likedPet.innerHTML = <img src="${image}" class="w-30 h-30" />;
//   likedContainer.appendChild(likedPet);
// };


loadAll();
// displayAllpets();
