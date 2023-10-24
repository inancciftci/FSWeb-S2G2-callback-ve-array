const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

// console.log(fifaData[0]["Away Team Name"]);

// for (let i of fifaData) {
//   console.log(i["Home Team Name"]);
// }

// for (let i of fifaData) {
//   console.log(i["Away Team Name"]);
// }

// for (let i of fifaData) {
//   console.log(i["Home Team Goals"]);
// }

// for (let i of fifaData) {
//   console.log(i["Away Team Goals"]);
// }

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
  return arr.filter((stage) => stage.Stage === "Final");
}

// console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, Finaller) {
  const years = Finaller(arr).map((data) => data.Year);
  return years;
}

// console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

//		sample
// 		"Home Team Name": "Germany FR",
//		"Home Team Goals": 3,
//		"Away Team Goals": 2,
//		"Away Team Name": "Hungary",
//		"Win conditions": "Brazil win on penalties (3 - 2)",

function Kazananlar(arr, Finaller) {
  const kazananlar = Finaller(arr).map((match) => {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      return match["Home Team Name"];
    } else if (match["Away Team Goals"] > match["Home Team Goals"]) {
      return match["Away Team Name"];
    } else {
      return match["Win conditions"].split(" win")[0];
    }
  });
  return kazananlar;
}

// console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(arr, Finaller, Yillar, Kazananlar) {
  const yillar = Yillar(arr, Finaller);
  //  console.log(`yillar: ${yillar}`);
  const kazananlar = Kazananlar(arr, Finaller);
  //   console.log(`kazananlar: ${kazananlar}`);
  const metin = yillar.map((year, index) => {
    const ulke = kazananlar[index];
    return `${year} yılında, ${ulke} dünya kupasını kazandı!`;
  });
  return metin;
}

// console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(fifaData) {
  const finals = Finaller(fifaData);
  const homeTotal = finals.reduce((toplam, match) => {
    return toplam + match["Home Team Goals"];
    console.log(match["Home Team Goals"]);
  }, 0);
  const awayTotal = finals.reduce((toplam, match) => {
    return toplam + match["Away Team Goals"];
  }, 0);
  const allTotal = awayTotal + homeTotal;
  const allAvg = allTotal / finals.length;
  return allAvg.toFixed(2);
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

let kisaltmalar = Finaller(fifaData).reduce((total, match) => {
  if (!total.includes(match["Home Team Initials"])) {
    total.push(match["Home Team Initials"]);
  }
  if (!total.includes(match["Away Team Initials"])) {
    total.push(match["Away Team Initials"]);
  }
  return total;
}, []);
// console.log(kisaltmalar);

function UlkelerinKazanmaSayilari(fifaData) {
  let result = Finaller(fifaData).reduce((total, match) => {
    let kazanan;
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      kazanan = match["Home Team Initials"];
    } else {
      kazanan = match["Away Team Initials"];
    }

    if (total[kazanan] == undefined) {
      total[kazanan] = 1;
    } else {
      total[kazanan] += 1;
    }
    return total;
  }, {});
  return result;
}

console.log(UlkelerinKazanmaSayilari(fifaData));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
