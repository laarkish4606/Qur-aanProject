const container = document.querySelector(".container");
const loader= document.querySelector("#loader");




const buildDom= (EnglishName,ArabicName,Number)=>{
    container.innerHTML += `
                <div class="surah-info">
            <div class="surah-name">
                <a href="http://127.0.0.1:5500/tafsiir.html?id=${Number}" id="surah-en">${EnglishName}</a>
                <a href="http://127.0.0.1:5500/tafsiir.html?id=${Number}"  id="surah-ar">${ArabicName}</a>
            </div>
            <span id="aya-number">${Number}</span>
        </div>
    `

}


const SerchSura=(e)=>{

    const surainfo= document.querySelectorAll(".surah-info");
    let term = e.target.value.toUpperCase();
    surainfo.forEach((surah)=>{
        let suraEn= surah.querySelector("#surah-en").innerText.toUpperCase();
        let suraAr= surah.querySelector("#surah-ar").innerText.toUpperCase();
        if(suraEn.indexOf(term) > -1 || suraAr.indexOf(term) > -1){
            surah.style.display = "flex";

        }else {
            surah.style.display = "none";
        }


    })


}


const SuraAll = async()=>{

    loader.style.display= "block";
    let response = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    let surah =await response.json();
    loader.style.display= "none";


    surah.data.surahs.forEach((sura)=>{
        // console.log(sura);
        buildDom(sura.englishName,sura.name,sura.number);
    })
    
    
} 
SuraAll();
document.addEventListener("input",SerchSura)

