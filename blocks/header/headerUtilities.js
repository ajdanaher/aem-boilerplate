
export async function loadNavContent() {
  try {
    const content = await getContentByCatatories('sports', 'baseball');
    console.log(content);
  } catch(e) {
    console.error(e);
  }
}

export function attachListners () {
  //const ulElement = document.querySelector('header nav .nav-sections .default-content-wrapper ul');
  const ulElement = document.querySelector('header nav .nav-sections .default-content-wrapper > ul');
  const navElements = ulElement.children;
  for(const child of navElements) {
    //console.log(child);
    // child.addEventListener('mouseover', event => {
    //   event.target.classList.add('nav-underline');
    // });
    // child.addEventListener('mouseout', event => {
    //   event.target.classList.remove('nav-underline');
    // });
  }
}

function attachNavMenuListners () {

}

function attachSubNavMenuListners () {

}

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