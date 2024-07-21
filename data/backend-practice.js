const xhr = new XMLHttpRequest(); // URL = Uniform Resource Locator

xhr.addEventListener('load', () => {
  console.log(xhr.response)
});

xhr.open('GET', 'https://supersimplebackend.dev'); // 2 params: type, where to send
xhr.send(); // asynchronous code