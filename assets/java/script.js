// var userContainer = document.getElementById('users');
// var fetchButton = document.getElementById('fetch-button');

// function getApi() {
//   var requestUrl = 'https://api.github.com/users?per_page=5';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (let i=0; i < data.length; i++) {
//       let userName = document.createElement('h3');
//       userName.textContent = data[i].login;
      
//       let userUrl = document.createElement('p');
//       userUrl.textContent = data[i].url;

//       userContainer.append(userName)
//       userContainer.append(userUrl)   
//     }
//   });
// }
// fetchButton.addEventListener('click', getApi);