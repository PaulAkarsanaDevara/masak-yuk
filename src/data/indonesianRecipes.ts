import type { Meal } from '@/types';

function recipe(
  id: string,
  name: string,
  thumb: string,
  category: string,
  tags: string,
  instructions: string,
  ingredients: [string, string][],
): Meal {
  const base: Meal = {
    idMeal: `local-${id}`,
    strMeal: name,
    strCategory: category,
    strArea: 'Indonesian',
    strInstructions: instructions,
    strMealThumb: thumb,
    strTags: tags,
    strYoutube: null,
    strSource: null,
  };
  for (let i = 1; i <= 20; i++) {
    const ing = ingredients[i - 1];
    base[`strIngredient${i}`] = ing ? ing[0] : null;
    base[`strMeasure${i}`] = ing ? ing[1] : null;
  }
  return base;
}

export const INDONESIAN_RECIPES: Meal[] = [
  recipe(
    'nasi-goreng',
    'Nasi Goreng',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Nasi_goreng_2.jpg/480px-Nasi_goreng_2.jpg',
    'Rice',
    'Nasi,Goreng,Indonesia,Sarapan',
    `Panaskan minyak dalam wajan besar di atas api sedang-tinggi.
Tumis bawang putih dan bawang merah hingga harum dan keemasan, sekitar 2 menit.
Masukkan cabai merah dan udang, masak hingga udang berubah warna, sekitar 2 menit.
Tambahkan nasi dingin, aduk rata agar tidak menggumpal.
Tuang kecap manis dan kecap asin, aduk terus selama 3-4 menit hingga nasi berwarna kecoklatan merata.
Buat ruang di tengah wajan, kocok telur dan tuang ke dalamnya. Aduk perlahan hingga setengah matang lalu campur dengan nasi.
Tambahkan garam dan merica secukupnya. Koreksi rasa.
Sajikan panas dengan taburan bawang goreng, irisan mentimun, dan kerupuk.`,
    [
      ['Nasi putih (dingin)', '3 porsi'],
      ['Telur ayam', '2 butir'],
      ['Udang sedang', '100 g'],
      ['Bawang putih', '4 siung, cincang'],
      ['Bawang merah', '5 siung, iris tipis'],
      ['Cabai merah', '2 buah, iris serong'],
      ['Kecap manis', '2 sdm'],
      ['Kecap asin', '1 sdm'],
      ['Minyak goreng', '3 sdm'],
      ['Garam', 'secukupnya'],
      ['Merica bubuk', 'secukupnya'],
      ['Bawang goreng', 'untuk taburan'],
      ['Mentimun', '½ buah, iris'],
      ['Kerupuk', 'untuk pelengkap'],
    ],
  ),

  recipe(
    'rendang',
    'Rendang Sapi',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Rendang.jpg/480px-Rendang.jpg',
    'Beef',
    'Rendang,Padang,Daging,Indonesia',
    `Haluskan semua bumbu halus (cabai merah kering, bawang merah, bawang putih, jahe, lengkuas, kunyit) menggunakan blender atau ulekan.
Panaskan minyak dalam wajan besar, tumis bumbu halus bersama serai, daun jeruk, dan daun salam hingga harum dan matang, sekitar 10 menit.
Masukkan potongan daging sapi, aduk hingga daging berubah warna dan terbalut bumbu.
Tuangkan santan kental, aduk perlahan. Masak dengan api sedang sambil terus diaduk agar santan tidak pecah.
Setelah mendidih, kecilkan api. Masak terus sambil sesekali diaduk hingga santan menyusut dan mengering, sekitar 2–3 jam.
Saat minyak mulai terpisah dan daging berwarna coklat kehitaman, rendang sudah matang.
Tambahkan gula merah dan garam, koreksi rasa. Angkat.
Sajikan dengan nasi putih hangat.`,
    [
      ['Daging sapi', '1 kg, potong dadu'],
      ['Santan kental', '800 ml'],
      ['Cabai merah kering', '15 buah, rendam'],
      ['Bawang merah', '10 siung'],
      ['Bawang putih', '6 siung'],
      ['Jahe', '3 cm'],
      ['Lengkuas', '3 cm'],
      ['Kunyit', '2 cm'],
      ['Serai', '3 batang, geprek'],
      ['Daun jeruk', '5 lembar'],
      ['Daun salam', '3 lembar'],
      ['Gula merah', '1 sdm'],
      ['Garam', 'secukupnya'],
      ['Minyak goreng', '3 sdm'],
    ],
  ),

  recipe(
    'sate-ayam',
    'Sate Ayam',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Satay-1.jpg/480px-Satay-1.jpg',
    'Chicken',
    'Sate,Ayam,Bakar,Indonesia',
    `Potong daging ayam menjadi dadu ukuran 2 cm, lalu tusuk 4-5 potong per tusuk sate.
Campurkan bumbu marinasi: kecap manis, minyak goreng, bawang putih halus, ketumbar, dan garam. Lumuri sate dengan bumbu dan diamkan 30 menit.
Bakar sate di atas bara api atau grill pan sambil dioles bumbu sesekali, sekitar 3-4 menit tiap sisi hingga matang.
Buat saus kacang: haluskan kacang tanah goreng, campur dengan kecap manis, air jeruk limau, air panas, cabai, dan garam hingga kental.
Sajikan sate panas dengan saus kacang, irisan bawang merah mentah, dan lontong atau nasi.`,
    [
      ['Dada ayam', '500 g'],
      ['Kecap manis', '3 sdm'],
      ['Minyak goreng', '2 sdm'],
      ['Bawang putih', '3 siung, haluskan'],
      ['Ketumbar bubuk', '1 sdt'],
      ['Garam', '1 sdt'],
      ['Kacang tanah goreng', '200 g'],
      ['Kecap manis (saus)', '3 sdm'],
      ['Air jeruk limau', '1 sdm'],
      ['Cabai rawit', '3 buah'],
      ['Bawang merah', '3 siung, iris tipis'],
      ['Lontong', 'secukupnya'],
    ],
  ),

  recipe(
    'gado-gado',
    'Gado-Gado',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Gado-gado.jpg/480px-Gado-gado.jpg',
    'Vegetarian',
    'Gado,Kacang,Sayur,Indonesia',
    `Rebus kentang, tahu, tempe, dan telur secara terpisah hingga matang. Potong-potong sesuai selera.
Blanch kangkung, kacang panjang, dan tauge sebentar dalam air mendidih, tiriskan segera agar tetap hijau.
Buat saus kacang: haluskan kacang tanah goreng dengan blender, tambahkan bawang putih goreng, cabai, kencur, gula merah, garam, dan air asam jawa. Encerkan dengan air hangat hingga konsistensi pas.
Tata semua sayuran dan pelengkap di piring. Siram dengan saus kacang hangat.
Taburi bawang goreng dan kerupuk. Sajikan segera.`,
    [
      ['Kentang', '200 g, rebus'],
      ['Tahu', '2 potong, goreng'],
      ['Tempe', '100 g, goreng'],
      ['Telur ayam', '2 butir, rebus'],
      ['Kangkung', '100 g'],
      ['Kacang panjang', '100 g'],
      ['Tauge', '50 g'],
      ['Kacang tanah goreng', '200 g'],
      ['Bawang putih', '2 siung, goreng'],
      ['Cabai merah', '3 buah'],
      ['Kencur', '1 cm'],
      ['Gula merah', '1 sdm'],
      ['Air asam jawa', '1 sdm'],
      ['Garam', 'secukupnya'],
      ['Bawang goreng', 'untuk taburan'],
      ['Kerupuk', 'pelengkap'],
    ],
  ),

  recipe(
    'soto-ayam',
    'Soto Ayam',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Soto_ayam.jpg/480px-Soto_ayam.jpg',
    'Chicken',
    'Soto,Sup,Ayam,Indonesia',
    `Rebus ayam bersama serai, daun jeruk, daun salam, dan daun bawang dalam 1,5 liter air hingga matang. Angkat ayam, suwir-suwir dagingnya, dan saring kaldu.
Haluskan bumbu: bawang merah, bawang putih, kunyit, jahe, dan ketumbar.
Tumis bumbu halus bersama lengkuas hingga harum dan matang. Masukkan ke dalam kaldu.
Didihkan kembali kaldu dengan bumbu, tambahkan garam dan merica. Koreksi rasa.
Siapkan mangkuk: taruh bihun yang sudah direbus, suwiran ayam, irisan tomat, dan daun seledri.
Tuang kuah soto panas. Sajikan dengan perasan jeruk nipis, sambal, dan kerupuk.`,
    [
      ['Ayam', '½ ekor'],
      ['Bihun', '100 g, seduh'],
      ['Bawang merah', '8 siung'],
      ['Bawang putih', '5 siung'],
      ['Kunyit', '3 cm'],
      ['Jahe', '2 cm'],
      ['Ketumbar', '1 sdt'],
      ['Serai', '2 batang, geprek'],
      ['Daun jeruk', '4 lembar'],
      ['Daun salam', '2 lembar'],
      ['Lengkuas', '2 cm, geprek'],
      ['Tomat', '1 buah, potong'],
      ['Daun seledri', 'untuk taburan'],
      ['Jeruk nipis', '1 buah'],
      ['Garam dan merica', 'secukupnya'],
      ['Bawang goreng', 'untuk taburan'],
    ],
  ),

  recipe(
    'bakso',
    'Bakso Sapi',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bakso_in_Solo.jpg/480px-Bakso_in_Solo.jpg',
    'Beef',
    'Bakso,Bola,Daging,Sup,Indonesia',
    `Haluskan daging sapi giling bersama bawang putih, garam, merica, dan es batu menggunakan food processor hingga lembut dan lengket.
Tambahkan tepung sagu dan telur putih, aduk rata. Adonan harus cukup padat untuk dibentuk.
Didihkan air dalam panci besar. Bentuk adonan menjadi bola-bola menggunakan sendok atau tangan yang dibasahi.
Masukkan bola bakso ke dalam air mendidih. Masak hingga bakso mengapung, tandanya sudah matang. Angkat.
Buat kuah: didihkan kaldu sapi, tumis bawang putih dan masukkan ke kaldu. Tambahkan garam dan merica.
Sajikan bakso dalam mangkuk dengan kuah panas, mie kuning, bihun, tahu, pangsit, daun seledri, dan sambal sesuai selera.`,
    [
      ['Daging sapi giling', '500 g'],
      ['Tepung sagu', '3 sdm'],
      ['Telur putih', '1 butir'],
      ['Bawang putih', '4 siung, haluskan'],
      ['Es batu', '50 g'],
      ['Garam', '1 sdt'],
      ['Merica bubuk', '½ sdt'],
      ['Kaldu sapi', '1,5 liter'],
      ['Mie kuning', '100 g'],
      ['Tahu pong', '2 potong'],
      ['Daun seledri', 'untuk taburan'],
      ['Bawang goreng', 'untuk taburan'],
      ['Sambal', 'secukupnya'],
    ],
  ),

  recipe(
    'mie-goreng',
    'Mie Goreng',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Mie_goreng.jpg/480px-Mie_goreng.jpg',
    'Pasta',
    'Mie,Goreng,Indonesia,Indomie',
    `Rebus mie telur hingga al dente, tiriskan dan siram air dingin agar tidak lengket. Sisihkan.
Panaskan minyak, tumis bawang putih dan bawang merah hingga harum. Tambahkan bakso iris dan udang, masak 2 menit.
Masukkan kol dan wortel, tumis hingga layu. Dorong ke pinggir wajan.
Kocok telur dan masak di tengah wajan hingga setengah matang, lalu campur dengan sayuran.
Masukkan mie, tuang kecap manis, kecap asin, dan saus tiram. Aduk rata dengan api besar.
Tambahkan garam, merica, dan kaldu bubuk. Koreksi rasa.
Sajikan dengan acar, irisan tomat, dan bawang goreng.`,
    [
      ['Mie telur', '200 g'],
      ['Telur ayam', '2 butir'],
      ['Udang', '100 g'],
      ['Bakso sapi', '5 butir, iris'],
      ['Kol', '100 g, iris'],
      ['Wortel', '1 buah, iris korek api'],
      ['Bawang putih', '4 siung, cincang'],
      ['Bawang merah', '4 siung, iris'],
      ['Kecap manis', '2 sdm'],
      ['Kecap asin', '1 sdm'],
      ['Saus tiram', '1 sdm'],
      ['Minyak goreng', '3 sdm'],
      ['Garam dan merica', 'secukupnya'],
      ['Bawang goreng', 'untuk taburan'],
    ],
  ),

  recipe(
    'opor-ayam',
    'Opor Ayam',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Opor_ayam.jpg/480px-Opor_ayam.jpg',
    'Chicken',
    'Opor,Ayam,Santan,Lebaran,Indonesia',
    `Goreng sebentar potongan ayam hingga kekuningan, sisihkan.
Haluskan bumbu: bawang merah, bawang putih, kemiri, ketumbar, dan merica.
Tumis bumbu halus bersama serai, daun jeruk, daun salam, dan lengkuas hingga harum dan matang, sekitar 8 menit.
Masukkan ayam, aduk rata dengan bumbu. Tuang santan encer, masak dengan api sedang.
Setelah mendidih dan ayam hampir matang (sekitar 20 menit), tuang santan kental.
Masak sambil sesekali diaduk hingga kuah mengental dan minyak terpisah. Jangan terlalu lama agar santan tidak pecah.
Tambahkan garam dan gula secukupnya. Sajikan dengan nasi dan pelengkap.`,
    [
      ['Ayam', '1 ekor, potong 12'],
      ['Santan kental', '400 ml'],
      ['Santan encer', '600 ml'],
      ['Bawang merah', '10 siung'],
      ['Bawang putih', '6 siung'],
      ['Kemiri', '5 butir, sangrai'],
      ['Ketumbar', '2 sdt'],
      ['Merica butir', '1 sdt'],
      ['Serai', '3 batang, geprek'],
      ['Daun jeruk', '5 lembar'],
      ['Daun salam', '3 lembar'],
      ['Lengkuas', '3 cm, geprek'],
      ['Gula', '1 sdt'],
      ['Garam', 'secukupnya'],
      ['Minyak goreng', '3 sdm'],
    ],
  ),

  recipe(
    'rawon',
    'Rawon Sapi',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Rawon.jpg/480px-Rawon.jpg',
    'Beef',
    'Rawon,Daging,Kluwek,Jawa Timur,Indonesia',
    `Rebus daging sapi dalam air hingga setengah matang, sekitar 30 menit. Potong dadu 3 cm, sisihkan kaldunya.
Haluskan bumbu: bawang merah, bawang putih, kunyit, lengkuas, ketumbar, dan merica.
Belah kluwek, ambil isinya, haluskan bersama sedikit air.
Tumis bumbu halus bersama serai, daun jeruk, dan daun salam hingga harum. Masukkan kluwek, aduk rata.
Masukkan tumisan bumbu ke dalam kaldu. Tambahkan daging sapi.
Masak dengan api kecil-sedang selama 1-1,5 jam hingga daging empuk dan kuah hitam pekat.
Koreksi rasa dengan garam dan gula. Sajikan panas dengan nasi, tauge pendek, daun bawang, sambal, dan kerupuk udang.`,
    [
      ['Daging sapi sandung lamur', '600 g'],
      ['Kluwek', '5 butir'],
      ['Bawang merah', '10 siung'],
      ['Bawang putih', '6 siung'],
      ['Kunyit', '2 cm'],
      ['Lengkuas', '2 cm'],
      ['Ketumbar', '1 sdt'],
      ['Merica butir', '½ sdt'],
      ['Serai', '2 batang, geprek'],
      ['Daun jeruk', '4 lembar'],
      ['Daun salam', '2 lembar'],
      ['Garam dan gula', 'secukupnya'],
      ['Tauge pendek', 'pelengkap'],
      ['Daun bawang', 'iris, pelengkap'],
      ['Kerupuk udang', 'pelengkap'],
    ],
  ),

  recipe(
    'pempek',
    'Pempek Palembang',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Pempek_kapal_selam_and_Pempek_lenjer.jpg/480px-Pempek_kapal_selam_and_Pempek_lenjer.jpg',
    'Seafood',
    'Pempek,Ikan,Palembang,Sumatera,Indonesia',
    `Haluskan ikan tenggiri menggunakan food processor atau ulekan hingga benar-benar lembut.
Campurkan ikan halus dengan tepung sagu sedikit demi sedikit, telur, garam, dan air es. Uleni hingga kalis dan tidak lengket.
Bentuk adonan: untuk kapal selam (isi telur mentah), bagi adonan, pipihkan dan bungkus telur utuh, rapatkan.
Untuk lenjer (silinder), gulung adonan sebesar jempol orang dewasa.
Rebus pempek dalam air mendidih hingga mengapung dan matang, sekitar 10-15 menit. Angkat dan tiriskan.
Goreng pempek dalam minyak panas hingga kekuningan dan garing.
Buat cuko (kuah): didihkan air, gula merah, cuka, bawang putih, dan cabai. Saring.
Sajikan pempek goreng dengan cuko, irisan timun, dan mi kuning.`,
    [
      ['Ikan tenggiri', '500 g, fillet'],
      ['Tepung sagu', '300 g'],
      ['Telur ayam', '4 butir (2 untuk adonan, 2 untuk isi)'],
      ['Air es', '150 ml'],
      ['Garam', '1½ sdt'],
      ['Gula merah (cuko)', '200 g'],
      ['Cuka (cuko)', '2 sdm'],
      ['Bawang putih (cuko)', '3 siung'],
      ['Cabai rawit (cuko)', '5 buah'],
      ['Air (cuko)', '300 ml'],
      ['Timun', '1 buah, potong dadu'],
      ['Mi kuning rebus', 'pelengkap'],
    ],
  ),
];

export const LOCAL_RECIPE_MAP = new Map<string, Meal>(
  INDONESIAN_RECIPES.map((r) => [r.idMeal, r]),
);
