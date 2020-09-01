const searchUrl = "https://google.com/search?q="

//Search on Enter
function search(e) {
    if (e.keyCode == 13) {
        let val = document.getElementById("search-field").value
        window.open(searchUrl + val)
    }
}

function getTime() {
    let date = new Date(),
        hour = date.getHours()
        minute = date.getMinutes()
        second = date.getSeconds()

    return (
        "" + 
        (hour < 10 ? "0" + hour : hour) + 
        ":" +
        (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second)
    )
}

//Weather
function getWeather() {
    let xhr = new XMLHttpRequest()
    xhr.open(
        "GET",
        "http://api.openweathermap.org/data/2.5/weather?q=Hallbergmoos&units=metric&appid=1983aa85d107dfef0130f8ea03d8012e"
    )
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText)
                document.getElementById("temp").innerHTML =
                    json.main.temp.toFixed(0) + " C";
                document.getElementById("weather-description").innerHTML =
                    json.weather[0].description
            } else {
                console.log("error msg: " + xhr.status)
            }
        }
    }
    xhr.send()
}

//Bookmarks
function setupBookmarks() {
    const bookmarkContainer = document.getElementById("bookmark-container")
    bookmarkContainer.innerHTML = bookmarks
        .map((b) => {
            const html = ["<div class='bookmark-set'>"]
            html.push(`<div class="bookmark-title">${b.title}</div>`)
            html.push(`<div class="bookmark-inner.container">`)
            html.push(
                ...b.links.map((l) => `<a class="bookmark" href="${l.url}" target="_blank">${l.name}</a>`)
            )
            html.push("</div></div>")
            return html.join("")
        })
        .join("")
}

window.onload= () => {
    setupBookmarks()
    getWeather()

    //Clock setup
    document.getElementById("clock").innerHTML = getTime()
    setInterval(() => {
        document.getElementById("clock").innerHTML = getTime()
    }, 100)
}

document.addEventListener("keyup", (event) => {
    if (event.keyCode == 32) {
        // Spacebar code to open search
        document.getElementById("search").style.display = "flex"
        document.getElementById("search-field").focus()
    } else if (event.keyCode == 27) {
        // Esc to close search
        document.getElementById("search-field").value = ""
        document.getElementById("search-field").blur()
        document.getElementById("search").style.display = "none"
    }
})