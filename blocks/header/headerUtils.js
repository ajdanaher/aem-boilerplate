
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
  populateSubnav1Col1(catagoryNames);
  populateSubnav1Col2(catagoryNames);
  populateSubnav1Col3(catagoryNames);
  populateSubnav1Col4(catagoryNames);

}

function populateSubnav1Col1 (catagoryList) {
  const section = document.getElementById('subnanav-list-col1');
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  catagoryList.forEach(catagory => {
    const sp = document.createElement('span');
    sp.innerText = catagory;
    sp.classList.add('col1-sp');
    section.append(sp);
    sp.addEventListener('mouseover', eventTarget => {
      if(!isClassPresentOnElement(sp, 'sp-mouseover')) {
        sp.classList.add('sp-mouseover');
      }
      populateRightSidePanel(catagoryName, subCatagoryName);
    });
    sp.addEventListener('mouseleave', eventTarget => {
      if(isClassPresentOnElement(sp, 'sp-mouseover')) {
        sp.classList.remove('sp-mouseover');
      }
    })
  })
}

function populateRightSidePanel(catagoryName, subCatagoryName) {
  
}

function populateSubnav1Col2 (catagoryList) {
  const section = document.getElementById('subnanav-list-col2');
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  catagoryList.forEach(catagory => {
    const sp = document.createElement('span');
    sp.innerText = catagory;
    section.append(sp);
  })
}

function populateSubnav1Col3 (catagoryList) {
  const section = document.getElementById('subnanav-list-col3');
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  catagoryList.forEach(catagory => {
    const sp = document.createElement('span');
    sp.innerText = catagory;
    section.append(sp);
  })
}

function populateSubnav1Col4 (catagoryList) {
  const section = document.getElementById('subnanav-list-col4');
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  catagoryList.forEach(catagory => {
    const sp = document.createElement('span');
    sp.innerText = catagory;
    section.append(sp);
  })
}
