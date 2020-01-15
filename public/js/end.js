//Function to print the history component by component
function startHistory(history) {
  let hist = JSON.parse(history)
  let keys = Object.keys(hist)
  let counter = 0
  keys.forEach(function(key, index) {
    if (hist[key]["answer"] != "") {
      let img = document.getElementById("avimg")

      let p = document.createElement("p")
      p.className = "line"
      p.innerHTML = hist[key]["answer"]

      setTimeout(function() {
        document.getElementById("lines").appendChild(p)
        img.src = hist[key]["general"]["url"]
      }, counter * 2000)

      setTimeout(function() {
        p.onmouseover = () => updateImg(hist[key]["alone"]["url"])
        p.onmouseleave = () => updateImg(hist["skin_tone"]["general"]["url"])
      }, keys.length * 2000)

      counter++
    }
  })
}

function updateImg(url) {
  let img = document.getElementById("avimg")
  img.src = url
}
