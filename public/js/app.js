console.log("client side js file loaded!!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   console.log(response);
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=NewDelhi")
//   .then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//       console.log(data.address);
//       console.log(data.forecast);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          console.log(data);
          console.log(data.address);
          console.log(data.forecast);
          messageOne.textContent = data.address;
          messageTwo.textContent = data.forecast.weatherDesription;
        }
      });
    })
    // .catch((error) => {
    //   console.log(error);
    //   messageOne.textContent = error;
    // });
  console.log("testing");
});
