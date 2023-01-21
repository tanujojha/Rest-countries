let countriesUrl = "https://restcountries.com/v3.1/all"

let count = 1

let rowDiv = document.createElement("div")
rowDiv.setAttribute("id", "rowdiv")
rowDiv.classList.add("row")

document.body.appendChild(rowDiv)



//weather component
let weatherComp = (obj)=>{
    let mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "maindiv")
    mainDiv.classList.add("container")
    // mainDiv.style.width = "30rem"
   
    let weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("id", "wethicon")
    weatherIcon.src = `http://openweathermap.org/img/wn/${obj.icon}@2x.png`
    weatherIcon.alt = "name of img"
    // weatherIcon.classList.add("")

    let cardBodyDiv = document.createElement("div")
    cardBodyDiv.setAttribute("id", "cardbodydiv")
    cardBodyDiv.classList.add("wethbody")

    let titleH1 = document.createElement("h1")
    titleH1.setAttribute("id", "wethtitle")
    titleH1.classList.add("wethtitle")
    titleH1.innerText = obj.name

    let cardText1 = document.createElement("p")
    cardText1.setAttribute("id", "text1")
    cardText1.classList.add("wethdata")
    cardText1.innerText = obj.desc

    let cardText2 = document.createElement("p")
    cardText2.setAttribute("id", "text2")
    cardText2.classList.add("wethdata")
    cardText2.innerText = obj.type

    let cardText3 = document.createElement("p")
    cardText3.setAttribute("id", "text3")
    cardText3.classList.add("wethdata")
    cardText3.innerText = `temp: ${obj.temp}`

    let cardText4 = document.createElement("p")
    cardText4.setAttribute("id", "text3")
    cardText4.classList.add("wethdata")
    cardText4.innerText = `humidity: ${obj.humidity}`



    cardBodyDiv.append(cardText1, cardText2, cardText3, cardText4)
    mainDiv.append(weatherIcon, titleH1, cardBodyDiv)
    document.body.appendChild(mainDiv)
}



// card component
let card = (obj)=>{
    let cardDiv = document.createElement("div")
    cardDiv.setAttribute("id", `card${count++}`)
    cardDiv.classList.add("card")
    cardDiv.style.width = "18rem"

    let title = document.createElement("h5")
    title.setAttribute("id", "title")
    title.classList.add("card-title")
    title.innerText = obj.name
   
    let cardImg = document.createElement("img")
    cardImg.setAttribute("id", "cardimg")
    cardImg.src = obj.flag
    cardImg.alt = obj.name
    cardImg.classList.add("card-img-top","cardimg")

    let cardBodyDiv = document.createElement("div")
    cardBodyDiv.setAttribute("id", "cardbodydiv")
    cardBodyDiv.classList.add("card-body")

    // let titleH1 = document.createElement("h5")
    // titleH1.setAttribute("id", "title")
    // titleH1.classList.add("card-title")
    // titleH1.innerText = obj.name

    let cardText1 = document.createElement("p")
    cardText1.setAttribute("id", "text1")
    cardText1.classList.add("card-text")
    cardText1.innerText = `lat: ${obj.lat}`

    let cardText2 = document.createElement("p")
    cardText2.setAttribute("id", "text2")
    cardText2.classList.add("card-text")
    cardText2.innerText = `lang: ${obj.lang}`

    let cardText3 = document.createElement("p")
    cardText3.setAttribute("id", "text2")
    cardText3.classList.add("card-text")
    cardText3.innerText = `region: ${obj.region}`

    let cardText4 = document.createElement("p")
    cardText4.setAttribute("id", "text2")
    cardText4.classList.add("card-text")
    cardText4.innerText = `capital: ${obj.capital}`

    let cardText5 = document.createElement("p")
    cardText5.setAttribute("id", "text2")
    cardText5.classList.add("card-text")
    cardText5.innerText = `code: ${obj.code}`


    let cardButtonLink = document.createElement("a")
    cardButtonLink.setAttribute("id", "cardbutton")
    cardButtonLink.classList.add("btn")
    cardButtonLink.innerText = "Click for Weather"
    // cardButtonLink.href = "#maindiv"

    //test
    // cardButtonLink.addEventListener("click", ()=>{
    //     // console.log(obj.lat);
    //     let x = document.getElementById("text1").textContent
    //     console.log(x);
    // })

    cardButtonLink.addEventListener("click", (event)=> handleClick(event, obj))


    cardBodyDiv.append(cardText1, cardText2, cardText3, cardText4, cardText5, cardButtonLink)
    cardDiv.append(title, cardImg, cardBodyDiv)
    document.getElementById("rowdiv").appendChild(cardDiv)
    
}


// get the weather data
// click handler
function handleClick(event, obj){

    let x = document.getElementById("rowdiv")
    x.style.display = "none"

    // let row = document.getElementById("rowdiv")
    // document.body.removeChild(row)
    // console.log(row);

    let lat = obj.lat;
    let lang = obj.lang

    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&units=metric&appid=15b0a530b6fe0a735a36df108892f490`;

    getWeather(weatherUrl).then((data)=>{
        console.log(data);

        let weatherObj = {
            name: data.name,
            type: data.weather[0].main,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,

        }

        weatherComp(weatherObj)
    })
}


// rest countries call
let getCountries = async (url)=>{
    let response = await fetch(url)
    
    return response.json()
}


// get weather call
let getWeather = async (url)=>{
    let response = await fetch(url)

    return response.json();
}


//get countries data
getCountries(countriesUrl).then((data)=>{
    // console.log(data);
    data.forEach((item) => {
        
        const countryObj = {
            flag: item.flags.png,
            name: item.name.common,
            capital: item.capital,
            region: item.region,
            lat: item.latlng[0],
            lang: item.latlng[1],
            code: item.fifa,
    
        }
        // console.log(countryObj.flag);
        card(countryObj)
            
    });
    
})


