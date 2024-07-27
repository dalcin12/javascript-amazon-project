export function redirectToHomePage() {
  const input = document.querySelector(`.js-search-bar`)

  document.querySelector(`.js-search-button`)
    .addEventListener('click', () => {
      window.location.href = `index.html?search=${input.value}`
    })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      window.location.href = `index.html?search=${input.value}`
    }
  })
}