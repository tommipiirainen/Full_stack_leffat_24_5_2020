var elokuvan_title = "";

haeArvostelut();

async function haeArvostelut(){
  const response = await fetch("/api/arvostelut");
  const data = await response.json();
  console.log(data);
  console.log(data[0].leffa);
  console.log(data[1].leffa);
  taytaTaulukko(data);
}

function taytaTaulukko(data){
    // Find a <table> element with id="myTable":
  var table = document.getElementById("arvostelutaulukko");
  for (var i = 0; i < data.length; i++) {

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(i + 1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = data[i].leffa;
  cell2.innerHTML = data[i].arvostelu;
  cell3.innerHTML = data[i].arvostelija;
  }
}

function tyhjenna_arvostelutaulukko(){
var table = document.getElementById("arvostelutaulukko");
var rivien_maara = table.rows.length - 1;

for (var i = 0; i < rivien_maara; i++) {
  table.deleteRow(1);
}
}


async function haeElokuva() {
  console.log("Hello world");
  var leffan_nimi = document.getElementById("leffa").value
  var leffan_vuosi = document.getElementById("vuosi").value

  var leffakysely = "http://www.omdbapi.com/?t=" + leffan_nimi + " &y=" + leffan_vuosi + "&apikey=a95f3723";

  const response = await fetch(leffakysely);
  const data = await response.json();

  console.log(data);

  console.log(data.Title);
  console.log(data.Year);
  elokuvan_title = data.Title;

  document.getElementById("leffan_nimi").innerHTML = data.Title;
  var posteri = document.getElementById("leffan_posteri");
  posteri.src = data.Poster;
}

async function lahetaArvostelu() {
  var arvostelu = document.getElementById("arvostelu").value
  var arvostelija = document.getElementById("arvostelija").value
  var leffa = elokuvan_title;

  console.log(arvostelu);
  console.log(arvostelija);
  console.log(elokuvan_title);

    const data = {leffa, arvostelu, arvostelija};
    const options = {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
     };
  fetch('/api/arvostele', options).then(function(response) {
        if(response.status == 200){
          console.log("ok");
          tyhjenna_arvostelutaulukko();
          haeArvostelut();
        }
      }, function(error){
        console.log(error.message);
    });



}
