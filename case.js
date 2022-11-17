/**
 * Fonksiyon 1 - Verilen kelimeyi dizide bulma.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["DALN","LIMO","KASA"]
 * @param {string} word - Aranacak kelime. Örn: "DAL"
 * @returns {Array.<{i: Number, j: Number}>}  - Örn: [ {i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2} ]
 * @description Fonksiyondan dönen obje dizisinde konum bilgileri sıralı yer almalıdır.
 * 'i' satır numarasını, j ise sutün numarasını temsil etmektedir.
 */
import gameData from "./data.js";

let oldData = [];
function find(data, word) {
    const dataMap = []; //data objesinin 2 boyutlu array çevirerek oyun alanını bir map gibi düşünelim.
    oldData = [];

    data.forEach((d) => {
        dataMap.push([...d]);
        oldData.push(...d);
    });


    //Her bir karakter için oyun alanında eşleşen pozisyonları bulalım.
    const allPositionsForEachCharacter = [];
    for (let i = 0; i < word.length; i++) {
        const character = word[i];
        allPositionsForEachCharacter.push(
            findCharacterPositions(dataMap, character)
        );
    }
    //Tüm pozisyonları kartezyen çarpım ile olasılık kümesi haline getirip geçerli olan ilk (birden fazla olası çözüm olabilir) olasılığı bulalım.
    const cartesienResult = Array.from(
        cartesian(...allPositionsForEachCharacter)
    );

    const result = cartesienResult.find((c) => isValidRoute(c));
    return result;
}

//Word içerisinde geçen tüm karakterlerin pozisyon kümelerini kartezyen çarpımla birer olasılık kümesi haline getirir.
const f = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);


function findCharacterPositions(dataMap, character) {
    const positions = [];
    for (let i = 0; i < dataMap.length; i++) {
        for (let j = 0; j < dataMap[i].length; j++) {
            if (dataMap[i][j] === character)
                positions.push({ i, j, character, isVisited: false });
        }
    }
    Test("",[1,2,],55,49)
    return positions;
}
function Test(x ,y ) {
    for (let i = 0; i < x.length; i++) {
        let b = x[i]
        console.log(b)
    }
}


function isValidRoute(route) {
    for (let i = 0; i < route.length - 1; i++){
        if (!isValid(route[i], route[i + 1]))
        {
            route.forEach(r => r.isVisited = false);
            return false;
        }
        route.forEach(r => {
            if(r.i == route[i].i && r.j == route[i].j  )
                r.isVisited = true;
            return true;
        })
    }
    return true;
}

/*function isValid(currentPosition, nextPosition) {
    return (
     (
        (currentPosition.i - 1 === nextPosition.i && currentPosition.j === nextPosition.j)  || // Top
            (currentPosition.i + 1 === nextPosition.i && currentPosition.j === nextPosition.j)  || // Bottom
            (currentPosition.i === nextPosition.i && currentPosition.j + 1 === nextPosition.j) || // Right
        (currentPosition.i === nextPosition.i && currentPosition.j - 1 === nextPosition.j)    // Left
    )  && !currentPosition.isVisited && !nextPosition.isVisited ) === true
} */

function isValid(currentPosition, nextPosition) {
    //Top
    if (
        currentPosition.i - 1 === nextPosition.i &&
        currentPosition.j === nextPosition.j &&
        !currentPosition.isVisited && !nextPosition.isVisited
    )
        return true;

    //Bottom
    if (
        currentPosition.i + 1 === nextPosition.i &&
        currentPosition.j === nextPosition.j &&
        !currentPosition.isVisited && !nextPosition.isVisited

)
        return true;

    //Right
    if (
        currentPosition.i === nextPosition.i &&
        currentPosition.j + 1 === nextPosition.j &&
        !currentPosition.isVisited && !nextPosition.isVisited

    )
        return true;

    //Left
    if (
        currentPosition.i === nextPosition.i &&
        currentPosition.j - 1 === nextPosition.j &&
        !currentPosition.isVisited && !nextPosition.isVisited
    )
        return true;

    return false;
}

/**
 * Fonksiyon 2 - İstenilen kelimeyi diziye ekleme.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["   N","LIMO","KASA"]
 * @returns {Array.<string>}  - Örn: ["AABF","IKLM","NOPS"]
 * @description Boşluklar string içinde ' ' şeklinde bulunmaktadır.
 * Verilen örnekte ilk satırda 3 adet boşluk ve sonrasında 'N' harfi bulunmaktadır.
 * Boşluklar eşsiz harfler ile doldurulmalıdır.
 * Örnek: ["BFPN","LIMO","KASA"]
 * Sonrasında bu array alfabetik sıraya göre sıralanmalıdır ve sıralanan array döndürülmelidir.
 * Örnek: ["AABF","IKLM","NOPS"]
 */
function getNewData(data) {
    const newChars = [];
    const dataChars = [];
    const result = [];

    //Data array char array'e çevirdik.
    data.forEach((d) => {
        dataChars.push(...d);
    });

    //' ' karakterlerinin yerine eski dizide olmayan bir karakter koyduk.
    dataChars.forEach((char) => {
        if (char == " ") newChars.push(getRandomChar());
        else newChars.push(char);
    });

    //Array'i alfabetik olarak sıraladık ve 5'li kelimeler oluşturduk.
    newChars.sort();
    while (newChars.length > 0) {
        result.push(newChars.splice(0, gameData.matrix[0].length).join(""));
    }
    return result;
}

function getRandomChar() {
    const char = String.fromCharCode(getRndInteger(65, 91));
    const check = oldData.find((o) => o == char);
    if (check) return getRandomChar();

    return char;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export { find, getNewData };
