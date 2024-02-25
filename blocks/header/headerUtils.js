
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
      handleMouseoverOnNav(liElement.innerText.trim());
    });
  }
}

function isClassPresentOnElement(element, className) {
  return element.classList.value.split(' ').find(name => name === className) !== undefined;
}

function handleMouseoverOnNav (elementName) {
  console.log(elementName);
}
