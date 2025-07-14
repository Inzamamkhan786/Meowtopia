const URL = "https://meowfacts.herokuapp.com/";
const factPara = document.querySelector("#fact-para");
const btn5 = document.querySelector("#btn");



const getFacts = async() =>{
    console.log("Getting data .....");
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    factPara.innerText = data.data[0];
};

btn5.addEventListener("click",getFacts);