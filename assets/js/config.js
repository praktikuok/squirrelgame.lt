window.SQUIRREL_GAME_CONFIG = Object.freeze({
  gameRulesUrl: '/game-rules.html',
  cookiesPolicyUrl: '/cookies.html',
  termsConditionsUrl: '/terms.html',
  pricing: {
    subtitle: 'Pasirink tinkamiausią pasiūlymą savo komandai ar kaip dovaną.',
    banner: {
      icon: 'fas fa-gift',
      text: 'Kalėdinis pasiūlymas – sutaupyk iki 15%!',
      label: 'Nuolaidos kodas',
      code: 'CRISTMAS'
    },
    options: [
      {
        key: 'ticket',
        title: 'Skaitmeninis bilietas',
        subtitle: 'Momentinis aktyvavimas, 1–6 dalyviai',
        icon: 'fas fa-ticket-alt',
        variant: 'pricing-card',
        originalPrice: 70,
        currentPrice: 60,
        discountLabel: 'Sutaupyk 15%',
        buttonLabel: 'Pirkti bilietą',
        buttonUrl: '#',
        features: [
          { icon: 'fas fa-bolt text-accent', text: 'Momentinis gavimas į el. paštą' },
          { icon: 'fas fa-users text-accent', text: 'Galioja visai 1–6 žmonių komandai' },
          { icon: 'fas fa-calendar-check text-accent', text: 'Lankstus pasirinktas laikas' }
        ]
      },
      {
        key: 'coupon',
        title: 'Skaitmeninis kuponas',
        subtitle: 'Puiki dovana, galioja 12 mėn.',
        icon: 'fas fa-gift',
        variant: 'pricing-card--accent',
        originalPrice: 70,
        currentPrice: 60,
        discountLabel: 'Sutaupyk 15%',
        buttonLabel: 'Pirkti kuponą',
        buttonUrl: '#',
        features: [
          { icon: 'fas fa-envelope-open-text text-accent', text: 'Personalizuojamas sveikinimas' },
          { icon: 'fas fa-clock text-accent', text: 'Naudojamas bet kuriuo metu per metus' },
          { icon: 'fas fa-map text-accent', text: 'Galioja visoms užduotims Vilniuje' }
        ]
      },
      {
        key: 'physical',
        title: 'Fizinis kalėdinis kuponas',
        subtitle: 'Su šventine pakuote ir pristatymu',
        icon: 'fas fa-gifts',
        variant: 'pricing-card--holiday',
        originalPrice: 75,
        currentPrice: 65,
        discountLabel: 'Sutaupyk 13%',
        buttonLabel: 'Užsisakyti kuponą',
        buttonUrl: '#',
        features: [
          { icon: 'fas fa-box text-white', text: 'Dovanų dėžutė ir personalizuota kortelė' },
          { icon: 'fas fa-shipping-fast text-white', text: 'Pristatymas į namus ar biurą' },
          { icon: 'fas fa-snowflake text-white', text: 'Kalėdinė dekoracija ir siurprizas' }
        ]
      }
    ]
  },
  leaderboard: {
    note: 'Duomenys atnaujinami kas savaitę.',
    entries: [
      { place: 1, team: 'Voverės medžiotojai', points: 920, time: '2:15', icon: 'fas fa-trophy text-yellow-500' },
      { place: 2, team: 'Miesto tyrinėtojai', points: 890, time: '2:28', icon: 'fas fa-medal text-gray-400' },
      { place: 3, team: 'Galvosūkių karaliai', points: 860, time: '2:34', icon: 'fas fa-medal text-orange-600' },
      { place: 4, team: 'Nuotykių ieškotojai', points: 830, time: '2:41' },
      { place: 5, team: 'Pirmi', points: 805, time: '2:47' }
    ]
  },
  testimonials: [
    {
      quote: 'Nuostabus būdas praleisti laiką su draugais! Mįslės buvo įdomios, o miestas – dar gražesnis nei maniau.',
      author: 'Justina M.',
      rating: 5
    },
    {
      quote: 'Puiki komandos veikla įmonės renginiui. Visi dalyvavo, juokėsi ir varžėsi. Rekomenduoju!',
      author: 'Tomas K.',
      rating: 5
    },
    {
      quote: 'Mano šeimai labai patiko! Net vaikai su entuziazmu sprendė užduotis. Ačiū už puikų popietę!',
      author: 'Giedrė P.',
      rating: 5
    },
    {
      quote: 'Originalus, smagu ir visai nesudėtinga dalyvauti. Tikrai grįšim dar kartą su kitais draugais!',
      author: 'Andrius L.',
      rating: 5
    }
  ],
  faq: [
    {
      question: 'Kiek žmonių gali dalyvauti?',
      answer: 'Komandoje gali būti nuo 1 iki 6 dalyvių. Rekomenduojame 2–6 žmones komandoje.'
    },
    {
      question: 'Ar galima žaisti lietingą dieną?',
      answer: 'Taip, žaidimas vyksta bet kokiu oru. Tiesiog apsirenkite pagal orą ir pasiimkite skėtį. Visos užduotys pritaikytos lauko sąlygoms.'
    },
    {
      question: 'Ar tinka vaikams?',
      answer: 'Žaidimas tinkamas visai šeimai. Jaunesni nei 16 metų vaikai gali dalyvauti tik su suaugusiųjų priežiūra.'
    },
    {
      question: 'Kokia kalba vyksta žaidimas?',
      answer: 'Šiuo metu žaidimas vyksta lietuvių kalba.'
    },
    {
      question: 'Kaip pasiruošti žaidimui?',
      answer: 'Prireiks bent vieno išmaniojo telefono su interneto ryšiu ir įkrautu akumuliatoriumi. Taip pat rekomenduojame patogius batus vaikščiojimui.'
    },
    {
      question: 'Ar galiu grąžinti bilietą?',
      answer: 'Ne, bilietų grąžinti negalima, tačiau galima pakeisti žaidimo datą, bet ne vėliau nei iki bilieto/kupono galiojimo pabaigos. Apie keičiamą datą privaloma informuoti ne vėliau kaip 48 valandas iki numatytos žaidimo pradžios.'
    }
  ],
  newsletterModal: {
    delayMs: 30000,
    enableDelay: true,
    enableExitIntent: true,
    buttonText: 'Gauti nuolaidą'
  }
});
