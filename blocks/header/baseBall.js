
import { cleanSubTree, createAnchorElement } from "./commonUtils.js";

export function populateBaseballDetails (data, subCatagory) {
  const col1 = document.getElementById('subnanav-list-col2');
  cleanSubTree(col1);
  populateSportsBaseballCol1(col1, data, subCatagory);

  const col2 = document.getElementById('subnanav-list-col3');
  cleanSubTree(col2);
  populateSportsBaseballCol2(col2, data, subCatagory);
}

function populateSportsBaseballCol1(element, dataOrg, subCatagory) {
  const data = dataOrg.data;
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

function populateSportsBaseballCol2(element, dataOrg, subCatagory) {
  const data = dataOrg.data;
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

function populateSportsBaseballCol2Section1 (element, data, subCatagory) {
  for(let i=6; i<=12; ++i) {
    const obj = data[i];
    const classes = ['section-margin-1'];
    const elementAnch = createAnchorElement(obj.Source, obj.Destination, classes);
    element.appendChild(elementAnch);
  }
}

