// p 의 innerHTML 을 "<input>" 으로 바꾸는거
var plusbutton = document.getElementById("plus")
var explain = document.getElementById("explaination")
var explain2 = document.getElementById("explaination2")
var members = document.getElementById("members")

plusbutton.onclick = function() {
  explain2.value = "Enter the name"
  explain2.style.color = "#9E9D9D"
  explain.style.display = "none"
  explain2.style.visibility = "visible"
}

explain2.onclick = function() {
  // 클릭되면 안의 텍스트 없앰, 텍스트 색 변경
  explain2.value = ""
  explain2.style.color = "#359BEF"
  // 이름을 쓰고 엔터를 치면 explain2.value
  explain2.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode
    if (key === 13 && explain2.value != "") {
      let value = explain2.value

      // 옆의 members 로 보낸다
      members.innerHTML += "<br>" + explain2.value
      explain2.value = ""
      explain.style.display = "block"
      explain2.style.visibility = "hidden"

      var inp = document.createElement("input")
      inp.type = "hidden"
      inp.name = "members[]"
      inp.value = value
      let form = document.getElementsByClassName("addMembersForm")
      form[0].appendChild(inp)
    }
  })
}
