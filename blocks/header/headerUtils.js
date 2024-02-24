

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
      div.appendChild(element);
    }
  } catch (e) {
    console.error(e);
  }
}

function populateSportsBaseball (element, data, subCatagory) {
  console.log(data);
  console.log(subCatagory);

  const col1 = document.createElement('div');
  col1.classList.add('subnav-detail-col');

  const col2 = document.createElement('div');
  col2.classList.add('subnav-detail-col');

  const col3 = document.createElement('div');
  col3.classList.add('subnav-detail-col');

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