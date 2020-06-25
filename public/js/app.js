console.log("Js file loaded !!");

// fetch("http://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  //   console.log(location);
  if (location !== "") {
    messageOne.textContent = "Loading..";

    fetch("/weather?address=" + location).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          //   console.log(data.error);
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          //   console.log(data.location, "has", data.temperature, "deg C");
          messageOne.textContent = data.location;
          messageTwo.textContent = data.temperature + " deg C";
        }
      });
    });
  } else {
    alert("Please enter a location to search");
  }
});
