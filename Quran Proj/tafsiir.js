
let container = document.querySelector(".container");

const url = window.location.href;
let url_variable= url.split('?')
let suraItself =url_variable[1].split('=');/* waxa uu ihaya ayada lafteeed*/
// suraItself[0] hold id of sura or number
// suraItself[1] hold the sura itself

let counter = 0;

let buildDom = (ayah, ayahNumber) => {
    if (typeof container === 'undefined') {
        console.error("Container is not defined");
        return;
    }

    if (counter < 1) {
        let ayahsplit = ayah.split("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ");
        if (ayahsplit.length > 1) {
            console.log(ayahsplit);
            
            container.innerHTML += `<div id="bisin"><a href="#" dir="rtl" lang="ar">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ </a></div>`;
            container.innerHTML += `<div style="padding-bottom:450px" id="ayah"><a href="#" dir="rtl" lang="ar">${ayahsplit[1]}<img src="./image/ayah.png" id="ayah-sign"><span id="ayah-number">${ayahNumber}</span></a></div>`;
        } else {
            container.innerHTML += `<div style="padding-bottom:450px" id="ayah"><a href="#" dir="rtl" lang="ar">${ayah}<img src="./image/ayah.png" id="ayah-sign"><span id="ayah-number">${ayahNumber}</span></a></div>`;
        }

        counter++;
    } else {
        container.innerHTML += `<div id="ayah"><a href="#" dir="rtl" lang="ar">${ayah}<img src="./image/ayah.png" id="ayah-sign"><span id="ayah-number">${ayahNumber}</span></a></div>`;
    }
}



const reading= async (number)=>{
    let response = await fetch(`http://api.alquran.cloud/v1/surah/${number}`);
    let surah = await response.json();

    console.log(surah);
    surah.data.ayahs.forEach((aya)=>{
        buildDom(aya.text,aya.numberInSurah);
        
    })
    


}
reading(suraItself[1]);
