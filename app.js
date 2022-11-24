const items = document.getElementById('items');
const items2 = document.getElementById('items2');
const modal = document.getElementById('modal');
const templateCard = document.getElementById('template-card').content;
const templateCardR = document.getElementById('template-card-region').content;
const templateModal = document.getElementById('template-modal').content;
const templateSearch = document.getElementById('template-search').content;
const fragment = document.createDocumentFragment();
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchInput");
const err = document.getElementById('err');

window.addEventListener('DOMContentLoaded', () => {
    fetchData()
});

items.addEventListener('click', e => {
    openModal(e)
})

const fetchData = async() => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json();
        printCard(data)
    } catch (error) {
        console.log(error.message)
    }    
};

switch (this.id) {
    case 'america':
        fetchRegions(america)
      break;
    case 'africa':
        fetchRegions(africa)
      break;
    case 'europe':
        fetchRegions(europe)
      break;
    case 'asia':
        fetchRegions(asia)
      break;
    case 'oceania':
        fetchRegions(oceania)
      break;
    case 'Antarctic':
        fetchRegions(Antarctic)
      break;
    default:
      break;
}

const fetchRegions = async(id) => {
    items2.innerHTML = ''
    try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${id}`)
        const data = await res.json()
        items.style.display = 'none'
        printCardbyRegion(data)
    } catch (error) {
        console.log(error.message)
    }
}



const printCardbyRegion = (data) => {
    data.forEach(element => {
        templateCardR.querySelector('img').setAttribute('src', element.flags.png);
        templateCardR.querySelector('p').textContent = 'Capital: ' + element.capital;
        templateCardR.querySelector('p').textContent = 'Population: ' + element.population;
        templateCardR.querySelector('span').textContent = 'Region: ' + element.region;
        templateCardR.querySelector('button').dataset.id = element.capital;
        const clone = templateCardR.cloneNode(true);
        fragment.appendChild(clone);
    });
    items2.appendChild(fragment);
};

const printCard = (data) => {
    data.forEach(element => {
        templateCard.querySelector('img').setAttribute('src', element.flags.png);
        templateCard.querySelector('#card-country').textContent = 'Country: ' + element.name.common;
        templateCard.querySelector('#capital').textContent = 'Capital: ' + element.capital;
        templateCard.querySelector('#region').textContent = 'Region: ' + element.region;
        templateCard.querySelector('#pop').textContent = 'Population: ' + element.population;
        templateCard.querySelector('button').dataset.id = element.capital;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
};

const openModal = e => {
    if(e.target.classList.contains('button-c')){
        setModal(e.target.parentElement)
    }
    e.stopPropagation();
}

const setModal = async(objeto) => {
    const producto = {
        id: objeto.querySelector('button').dataset.id,
        info: await fetch(`https://restcountries.com/v3.1/capital/${objeto.querySelector('button').dataset.id}`).then(res=>res.json()),
    }
    createModal(producto.info[0])
}

const createModal = (e) => {
    modal.innerHTML = '';
    modal.style.display = 'flex';
    modal.style.position = 'absolute';
    modal.style.top = '170px';
    modal.style.height = '500px';
    modal.style.width = '320px';
    modal.style.backgroundColor = 'white';
    modal.style.border = '1px solid gray';
    modal.style.borderRadius = '20px';
    modal.style.boxShadow = '0px 0px 25px gray';
    templateModal.querySelector('img').setAttribute('src', e.flags.png);
    templateModal.querySelector('#modal-country').textContent = 'Country: ' + e.name.common;
    templateModal.querySelector('#modal-capital').textContent = 'Capital: ' + e.capital;
    templateModal.querySelector('#modal-region').textContent = 'Region: ' + e.region;
    templateModal.querySelector('#modal-pop').textContent = 'Population: ' + e.population;
    templateModal.querySelector('#modal-fifa').textContent = 'FIFA: ' + e.fifa;
    const clone = templateModal.cloneNode(true);
    fragment.appendChild(clone);
    modal.appendChild(fragment);
}

const closeModal = () => {
    modal.style.display = 'none';
}



//Searched Country Render
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchTerm = searchInput.value;
    search(searchTerm);
  });

const search = async(searchTerm) => {
    items.innerHTML = ''
    items2.innerHTML = ''
    const path = `https://restcountries.com/v3.1/name/${searchTerm}`;
    const countrySearch = await fetch(path).then(res=>res.json());
    if(searchTerm == ""){
      err.style.display = "none";
      fetchData()
    }
    else if(countrySearch.status == '404'){
      err.style.display = "flex";
    }
    else {
    err.style.display = "none";
    searchCard(countrySearch)
    }
};

const searchCard = (data) => {
    data.forEach(element => {
        console.log(element)
        templateSearch.querySelector('img').setAttribute('src', element.flags.png);
        templateSearch.querySelector('#search-country').textContent = 'Country: ' + element.name.common;
        templateSearch.querySelector('#search-capital').textContent = 'Capital: ' + element.capital;
        templateSearch.querySelector('#search-region').textContent = 'Region: ' + element.region;
        templateSearch.querySelector('#search-pop').textContent = 'Population: ' + element.population;
        templateSearch.querySelector('#search-fifa').textContent = 'FIFA: ' + element.fifa;
        const clone = templateSearch.cloneNode(true);
        fragment.appendChild(clone);
    });
    items2.appendChild(fragment);
};

