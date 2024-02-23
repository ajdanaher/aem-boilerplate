

export function updateDomForNav() {
  const ulElement = document.querySelector('header nav .nav-sections .default-content-wrapper > ul');
  const navElements = ulElement.children;
  //for(const child of navElements) {
  //  console.log(child);
    const child = navElements[0];
    const subNavDiv = document.createElement('nav');
    subNavDiv.classList.add('subnav-detail-position');
    child.appendChild(subNavDiv);
  //}
}