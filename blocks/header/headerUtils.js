import { loadFragment } from "../fragment/fragment.js";

export function updateDomForNav() {
  const ulElement = document.querySelector('header nav .nav-sections .default-content-wrapper > ul');
  const navElements = ulElement.children;
  //for(const child of navElements) {
  //  console.log(child);
    const child = navElements[0];
    const subNavDiv = document.createElement('div');
    subNavDiv.classList.add('subnav-section');
    updateDomForContent(subNavDiv, 'sports', 'baseball');
    child.appendChild(subNavDiv);
  //}
}

async function updateDomForContent (div, menu, subMenu) {
  try {
    const {data, subCatagory} = await getContentByCatatories(menu, subMenu);
    if(menu === 'sports' && subMenu === 'baseball') {
      //const element = document.createElement('div');
      populateSportsBaseball(div, data.data, subCatagory);
      //div.appendChild(element);
    }
  } catch (e) {
    console.error(e);
  }
}

function createAnchorElement (text, destination, classNames) {
  const element = document.createElement('a');
  element.innerText = text;
  element.setAttribute('href', destination);
  element.classList.add(...classNames);
  return element;
}

function populateSportsBaseballCol1Section1 (element, data, subCatagory) {
  for(let i=0; i<=3; ++i) {
    const obj = data[i];
    const classes = ['section-margin-1'];
    if(i === 0) {
      classes.push('main-subnav');
    }
    const elementAnch = createAnchorElement(obj.Source, obj.Destination, classes);
    element.appendChild(elementAnch);
  }
}

function  populateSports_Baseball_Col1_OtherSections(section, data) {
  data.forEach(obj => {
    const element = createAnchorElement(obj.Source, obj.Destination, ['section-margin-2']);
    section.appendChild(element);
  })
}

function populateSportsBaseballCol1(element, data, subCatagory) {
  const section1 = document.createElement('div');
  section1.id = 'sports-baseball-section1';
  section1.classList.add('subnav-detail-section-col');
  populateSportsBaseballCol1Section1(section1, data, subCatagory);
  element.appendChild(section1);

  const section2 = document.createElement('div');
  section2.id = 'sports-baseball-section2';
  section2.classList.add('subnav-detail-section-col');
  const sp1 = document.createElement('span');
  sp1.innerText = data[4].Source;
  sp1.classList.add('section-margin-1');
  section2.appendChild(sp1);

  let sectionDataName = `/helix-${data[4].Source.replaceAll(' ', '-')}.json`;
  let dataObjects = subCatagory.filter(e => e.name === sectionDataName)[0].data.data;
  populateSports_Baseball_Col1_OtherSections(section2, dataObjects)
  element.appendChild(section2);

  const section3 = document.createElement('div');
  section3.id = 'sports-baseball-section3';
  section3.classList.add('subnav-detail-section-col');
  element.appendChild(section3);

  const sp2 = document.createElement('span');
  sp2.innerText = data[5].Source;
  sp2.classList.add('section-margin-1');
  section3.appendChild(sp2);

  sectionDataName = `/helix-${data[5].Source.replaceAll(' ', '-')}.json`;
  dataObjects = subCatagory.filter(e => e.name === sectionDataName)[0].data.data;
  populateSports_Baseball_Col1_OtherSections(section3, dataObjects)
  element.appendChild(section3);
}

function populateSportsBaseballCol2Section1 (element, data, subCatagory) {
  for(let i=6; i<=12; ++i) {
    const obj = data[i];
    const classes = ['section-margin-1'];
    const elementAnch = createAnchorElement(obj.Source, obj.Destination, classes);
    element.appendChild(elementAnch);
  }
}

function populateSportsBaseballCol2(element, data, subCatagory) {
  const section1 = document.createElement('div');
  section1.id = 'sports-baseball-section1-col2';
  section1.classList.add('subnav-detail-section-col');
  populateSportsBaseballCol2Section1(section1, data, subCatagory);
  const sectionChildren = section1.children;
  const dealChild = sectionChildren[section1.childElementCount -1];
  dealChild.classList.add('red-font');
  element.appendChild(section1);

  const section2 = document.createElement('div');
  section2.id = 'sports-baseball-section2-col2';
  section2.classList.add('subnav-detail-section-col');
  const sp1 = document.createElement('span');
  sp1.innerText = data[13].Source;
  sp1.classList.add('section-margin-1');
  section2.appendChild(sp1);

  let sectionDataName = `/helix-${data[13].Source.replaceAll(' ', '-')}.json`;
  let dataObjects = subCatagory.filter(e => e.name === sectionDataName)[0].data.data;
  populateSports_Baseball_Col1_OtherSections(section2, dataObjects);
  element.appendChild(section2);

  const section3 = document.createElement('div');
  section3.id = 'sports-baseball-section3-col2';
  section3.classList.add('subnav-detail-section-col');
  const sp2 = document.createElement('span');
  sp2.innerText = data[14].Source;
  sp2.classList.add('section-margin-1');
  section3.appendChild(sp2);

  sectionDataName = `/helix-${data[14].Source.replaceAll(' ', '-')}.json`;
  dataObjects = subCatagory.filter(e => e.name === sectionDataName)[0].data.data;
  populateSports_Baseball_Col1_OtherSections(section3, dataObjects);
  element.appendChild(section3);

}

async function populateSportsBaseballCol3(element, data, subCatagory) {
  const path = '/sports-baseball-images';
  try {
    const fragment = await loadFragment(path);
    const imageDiv = fragment.getElementsByClassName('library-metadata block')[0];
    element.appendChild(imageDiv);
  } catch (e) {
    console.error(e);
  }

}

function populateSportsBaseball (element, data, subCatagory) {
  console.log(data);
  console.log(subCatagory);

  const col1 = document.createElement('div');
  col1.classList.add('subnav-detail-col');
  populateSportsBaseballCol1(col1, data, subCatagory);

  const col2 = document.createElement('div');
  col2.classList.add('subnav-detail-col');
  populateSportsBaseballCol2(col2, data, subCatagory);

  const col3 = document.createElement('div');
  col3.classList.add('subnav-detail-col');
  //populateSportsBaseballCol3(col1, data, subCatagory);

  element.appendChild(col1);
  element.appendChild(col2);
  element.appendChild(col3);
}

const getRemoteData = url => new Promise(async(resolve, reject) => {
  try {
    const p = await fetch(url);
    const data = await p.json();
    resolve(data);
  } catch (e) {
    console.error(`url is ${url}.`);
    console.error(e.message);
    reject(e);
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

const getContentByCatatories = (menu, submenu) => new Promise(async (resolve, reject) => {
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