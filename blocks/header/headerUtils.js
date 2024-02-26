import { populateBaseballDetails } from './baseBall.js'; 

export function checkAndCreateLeftNav () {
  const navWrapper = document.getElementsByClassName('nav-wrapper')[0];
  const navDetails = navWrapper.getElementsByClassName('nav-details');
  if(navDetails.length === 0) {
    const navDetails = createNavDetails();
    navWrapper.appendChild(navDetails);
    createNavDetailsSections();
  }
  attachListnerForSectionDisplay();
}

function createNavDetails () {
  const navDetails = document.createElement('section');
  navDetails.id = 'nav-details';
  navDetails.classList.add('nav-details', 'hide-flex');
  navDetails.addEventListener('mouseleave', target => {
    if(isClassPresentOnElement(navDetails, 'hide-flex') === false) {
      navDetails.classList.add('hide-flex');
    }
  })
  return navDetails;
}

function createNavDetailsSections () {
  const navDetails = document.getElementById('nav-details');
  for(let i=0; i <=3; ++i) {
    const flexItem = document.createElement('div');
    const classList = ['flex-item'];
    flexItem.id = `subnanav-list-col${i+1}`;
    flexItem.classList.add(...classList);
    navDetails.append(flexItem);
  }
}

function attachListnerForSectionDisplay () {
  const navSections = document.getElementsByClassName('section nav-sections')[0];
  const ulWrapper = navSections.getElementsByClassName('default-content-wrapper')[0].firstElementChild;
  for(const liElement of ulWrapper.children) {
    liElement.addEventListener('mouseover', event => {
      const navSection = document.getElementById('nav-details');
      if(isClassPresentOnElement(navSection, 'hide-flex')) {
        navSection.classList.remove('hide-flex');
      }
      handleMouseoverOnNav(liElement);
    });
  }
}

function isClassPresentOnElement(element, className) {
  return element.classList.value.split(' ').find(name => name === className) !== undefined;
}

function handleMouseoverOnNav (navElement) {
  const name = navElement.innerText.trim();
  const ul = navElement.children[0];
  const catagoryNames = [];
  for(const child of ul.children) {
    catagoryNames.push(child.innerText.trim());
  }
  populateSubnav1Col1(name, catagoryNames);
}

function populateSubnav1Col1 (navCatagoryName, catagoryList) {
  const section = document.getElementById('subnanav-list-col1');
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  catagoryList.forEach(subCatagoryName => {
    const sp = document.createElement('span');
    sp.innerText = subCatagoryName;
    sp.classList.add('col1-sp');
    section.append(sp);
    sp.addEventListener('mouseover', eventTarget => {
      if(!isClassPresentOnElement(sp, 'sp-mouseover')) {
        sp.classList.add('sp-mouseover');
      }
      populateRightSidePanel(navCatagoryName, subCatagoryName);
    });
    sp.addEventListener('mouseleave', eventTarget => {
      if(isClassPresentOnElement(sp, 'sp-mouseover')) {
        sp.classList.remove('sp-mouseover');
      }
    })
  })
}

async function populateRightSidePanel (navCatagory, leftSubNavCatagory) {
  try {
    const {data, subCatagory} = await getRightSidePanelData(navCatagory, leftSubNavCatagory);

    switch(leftSubNavCatagory.toLowerCase()) {
      case 'baseball':
        populateBaseballDetails(data, subCatagory);
        break;
    }
    
  } catch (e) {
    console.error(e.message);
  }
}

const getRightSidePanelData = (menu, submenu) => new Promise(async (resolve, reject) => {
  try {
    const fileName = `/helix-${menu}-${submenu}.json`;
    const data = await getRemoteData(fileName);
    const subCatagory = await getSubCatagoryContent(data);
    resolve({
      data,
      subCatagory
    });
  } catch (e) {
    console.error(e);
    reject(e);
  }
});

const getRemoteData = url => new Promise(async(resolve, reject) => {
  try {
    const response = await fetch(url.toLowerCase());
    if (response.ok && response.status === 200) {
      const data = await response.json();
      resolve(data);
    } else {
      throw new Error(`Response Status is ${response.status}. Status Text is ${response.statusText}, url is ${url}`);
    }
  } catch (e) {
    console.error(e.message);
    reject(e.message);
  }
});

const getSubCatagoryContent = data => new Promise (async (resolve, reject) => {
  const subCatagory = [];
  for(const item of data.data) {
    let name = '';
    if (item.Destination.indexOf(' | ') !== -1) {
      name = item.Destination.split(' | ')[1];
    } else if (item.Destination.search(/\/helix-.+.json$/) !== -1) {
      name = item.Destination;
    } else {
      continue;
    }

    try {
      const remoteData = await getRemoteData(name.toLowerCase());
      subCatagory.push({
        name,
        'data': remoteData
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  }
  resolve(subCatagory);
});

