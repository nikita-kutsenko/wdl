class Dou{
  constructor(url) {
      this.url = url
  }

  async getData(from) {
      let response = await fetch ( this.url ),
          data = await response.json();
      console.log(data, "from getData", from);
      return Promise.resolve(data);
  }
}

let counter = 0;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// MEANS 
let MEAN_AMOUNTS_in_sal_20_dec;
let TREND_AMOUNTS_in_sal_21_jun, TREND_AMOUNTS_jun_sal_21_jun;
let MEAN_AMOUNTS_jun_sal_20_dec, MEAN_AMOUNTS_jun_sal_20_jun, MEAN_AMOUNTS_jun_sal_19_dec, MEAN_AMOUNTS_jun_sal_19_jun;

// 2020 DEC
let all_user_20_dec, user_20_dec, in_user_20_dec, in_sal_20_dec, jun_user_20_dec, jun_sal_20_dec;
let AMOUNTS_in_sal_20_dec = {
  salaries: [],
  amount: []
},
AMOUNTS_jun_sal_20_dec = {
  salaries: [],
  amount: []
}
new Dou("/dou/2020_dec_raw.json")
  .getData('20 dec')
  .then(data => {
    all_user_20_dec = data
  })
  .then(() => { 
    user_20_dec = all_user_20_dec.filter( user => user["Вкажіть вашу спеціалізацію"] === "Front-end" )
  })
  .then( () => {
    in_user_20_dec = user_20_dec.filter( user => user["Ваш тайтл"] === "Intern/Trainee" )
    in_sal_20_dec = in_user_20_dec.map( user => user["Зарплата у $$$ за місяць, лише ставка після сплати податків"])

    for (let i = 0; i < in_sal_20_dec.length; i++) {
      index = AMOUNTS_in_sal_20_dec.salaries.indexOf(in_sal_20_dec[i])
      if (index === -1) {
        AMOUNTS_in_sal_20_dec.salaries.push(in_sal_20_dec[i]);
        AMOUNTS_in_sal_20_dec.amount.push(1);
      } else {
        AMOUNTS_in_sal_20_dec.amount[index]++;
      }
    }

  })
  .then( () => {
    jun_user_20_dec = user_20_dec.filter( user => user["Ваш тайтл"] === "Junior" )
    jun_sal_20_dec = jun_user_20_dec.map( user => user["Зарплата у $$$ за місяць, лише ставка після сплати податків"])

    for (let i = 0; i < jun_sal_20_dec.length; i++) {
      index = AMOUNTS_jun_sal_20_dec.salaries.indexOf(jun_sal_20_dec[i])
      if (index === -1) {
        AMOUNTS_jun_sal_20_dec.salaries.push(jun_sal_20_dec[i]);
        AMOUNTS_jun_sal_20_dec.amount.push(1);
      } else {
        AMOUNTS_jun_sal_20_dec.amount[index]++;
      }
    }
  })
  .then( () => {
    let totalInt = 0;
    for(let i = 0; i < AMOUNTS_in_sal_20_dec.salaries.length; i++) {
      totalInt += AMOUNTS_in_sal_20_dec.salaries[i];
    }
    MEAN_AMOUNTS_in_sal_20_dec = Math.floor(totalInt / AMOUNTS_in_sal_20_dec.salaries.length);

    let totalJun = 0;
    for(let i = 0; i < AMOUNTS_jun_sal_20_dec.salaries.length; i++) {
      totalJun += AMOUNTS_jun_sal_20_dec.salaries[i];
    }
    MEAN_AMOUNTS_jun_sal_20_dec = Math.floor(totalJun / AMOUNTS_jun_sal_20_dec.salaries.length);
  })
  .then( () => {
    chart_mean_in()
    chart_in()
    counter++;
    chart_trend_jun();
    chart_jun()
  })
function chart_in () {
  var ctx = document.getElementById('chart_default_in').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_in_sal_20_dec.amount,
          datasets: [{
              label: 'December 2020',
              data: AMOUNTS_in_sal_20_dec.salaries,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}



// 2020 JUN
let all_user_20_jun, jun_user_20_jun, jun_sal_20_jun;
let AMOUNTS_jun_sal_20_jun = {
  salaries: [],
  amount: []
}
new Dou("/dou/2020_june_mini.json")
  .getData('20 jun')
  .then(data => {
    all_user_20_jun = data
  })
  .then( () => {
    jun_user_20_jun = all_user_20_jun.filter( user => user["Должность"] === "Junior Software Engineer" && user["Язык.программирования"] === "JavaScript" )
    jun_sal_20_jun = jun_user_20_jun.map( user => user["Зарплата.в.месяц"])

    for (let i = 0; i < jun_sal_20_jun.length; i++) {
      index = AMOUNTS_jun_sal_20_jun.salaries.indexOf(jun_sal_20_jun[i])
      if (index === -1) {
        AMOUNTS_jun_sal_20_jun.salaries.push(jun_sal_20_jun[i]);
        AMOUNTS_jun_sal_20_jun.amount.push(1);
      } else {
        AMOUNTS_jun_sal_20_jun.amount[index]++;
      }
    }
  })
  .then( () => {
    let total = 0;
    for(let i = 0; i < AMOUNTS_jun_sal_20_jun.salaries.length; i++) {
        total += AMOUNTS_jun_sal_20_jun.salaries[i];
    }
    MEAN_AMOUNTS_jun_sal_20_jun = Math.floor(total / AMOUNTS_jun_sal_20_jun.salaries.length);
  })
  .then( () => {
    counter++;
    chart_trend_jun();
    chart_jun()
  })



// 2019 DEC
let all_user_19_dec, jun_user_19_dec, jun_sal_19_dec;
let AMOUNTS_jun_sal_19_dec = {
  salaries: [],
  amount: []
}
new Dou("../dou/2019_dec_raw.json")
  .getData('19 dec')
  .then(data => {
    all_user_19_dec = data
  })
  .then( () => {
    jun_user_19_dec = all_user_19_dec.filter( user => user["Оберіть вашу посаду"] === "Junior Software Engineer" && user["Основна мова програмування"] === "JavaScript" )
    jun_sal_19_dec = jun_user_19_dec.map( user => user["Зарплата за місяць, net, після податків"])

    for (let i = 0; i < jun_sal_19_dec.length; i++) {
      index = AMOUNTS_jun_sal_19_dec.salaries.indexOf(jun_sal_19_dec[i])
      if (index === -1) {
        AMOUNTS_jun_sal_19_dec.salaries.push(jun_sal_19_dec[i]);
        AMOUNTS_jun_sal_19_dec.amount.push(1);
      } else {
        AMOUNTS_jun_sal_19_dec.amount[index]++;
      }
    }
  })
  .then( () => {
    let total = 0;
    for(let i = 0; i < AMOUNTS_jun_sal_19_dec.salaries.length; i++) {
        total += AMOUNTS_jun_sal_19_dec.salaries[i];
    }
    MEAN_AMOUNTS_jun_sal_19_dec = Math.floor(total / AMOUNTS_jun_sal_19_dec.salaries.length);
  })
  .then( () => {
    counter++;
    chart_trend_jun();
    chart_jun()
  })



// 2019 JUN
let all_user_19_jun, jun_user_19_jun, jun_sal_19_jun;
let AMOUNTS_jun_sal_19_jun = {
  salaries: [],
  amount: []
}
new Dou("../dou/2019_june_raw.json")
  .getData('19 jun')
  .then(data => {
    all_user_19_jun = data
  })
  .then( () => {
    jun_user_19_jun = all_user_19_jun.filter( user => user["Должность"] === "Junior Software Engineer" && user["Язык программирования"] === "JavaScript" )
    jun_sal_19_jun = jun_user_19_jun.map( user => user["Зарплата в месяц"])

    for (let i = 0; i < jun_sal_19_jun.length; i++) {
      index = AMOUNTS_jun_sal_19_jun.salaries.indexOf(jun_sal_19_jun[i])
      if (index === -1) {
        AMOUNTS_jun_sal_19_jun.salaries.push(jun_sal_19_jun[i]);
        AMOUNTS_jun_sal_19_jun.amount.push(1);
      } else {
        AMOUNTS_jun_sal_19_jun.amount[index]++;
      }
    }
  })
  .then( () => {
    let total = 0;
    for(let i = 0; i < AMOUNTS_jun_sal_19_jun.salaries.length; i++) {
        total += AMOUNTS_jun_sal_19_jun.salaries[i];
    }
    MEAN_AMOUNTS_jun_sal_19_jun = Math.floor(total / AMOUNTS_jun_sal_19_jun.salaries.length);
  })
  .then( () => {
    counter++;
    chart_trend_jun();
    chart_jun()
  })

function chart_jun () {
  if (counter < 4) return;
  var ctx = document.getElementById('chart_default_jun').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_jun_sal_20_dec.amount,
          datasets: [
            {
              label: 'December 2020',
              data: AMOUNTS_jun_sal_20_dec.salaries,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          },
          {
            label: 'June 2020',
            data: AMOUNTS_jun_sal_20_jun.salaries,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'December 2019',
            data: AMOUNTS_jun_sal_19_dec.salaries,
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'June 2019',
            data: AMOUNTS_jun_sal_19_jun.salaries,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}


// MEANS FUNCTIONS 
function chart_mean_in () {
  TREND_AMOUNTS_in_sal_21_jun = calcMean([MEAN_AMOUNTS_in_sal_20_dec, MEAN_AMOUNTS_in_sal_20_dec], [1, 2], 3);
  console.log(TREND_AMOUNTS_in_sal_21_jun);
  var ctx = document.getElementById('chart_in').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['december 2020','june 2021'],
          datasets: [{
              label: 'Intern/Trainee Front-end developers. December 2020 - Trend up to June 2021',
              data: [MEAN_AMOUNTS_in_sal_20_dec, MEAN_AMOUNTS_in_sal_20_dec, TREND_AMOUNTS_in_sal_21_jun],
              backgroundColor: [
                  'rgba(101, 101, 101, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(101, 101, 101, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function chart_trend_jun () {
  if (counter < 4) return;
  TREND_AMOUNTS_jun_sal_21_jun = calcMean([MEAN_AMOUNTS_jun_sal_19_jun, MEAN_AMOUNTS_jun_sal_19_dec, MEAN_AMOUNTS_jun_sal_20_jun, MEAN_AMOUNTS_jun_sal_20_dec], [1, 2, 3, 4], 5);
  console.log("TREND_AMOUNTS_jun_sal_21_jun", TREND_AMOUNTS_jun_sal_21_jun);
  var ctx = document.getElementById('chart_jun').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['june 2019', 'december 2019','june 2020', 'december 2020','june 2021'],
          datasets: [{
              label: 'Junior Front-end developers. June 2019 - Trend up to June 2021',
              data: [MEAN_AMOUNTS_jun_sal_19_jun, MEAN_AMOUNTS_jun_sal_19_dec, MEAN_AMOUNTS_jun_sal_20_jun, MEAN_AMOUNTS_jun_sal_20_dec, TREND_AMOUNTS_jun_sal_21_jun],
              backgroundColor: [
                  'rgba(101, 101, 101, 0.2)',
                  'rgba(101, 101, 101, 0.2)',
                  'rgba(101, 101, 101, 0.2)',
                  'rgba(101, 101, 101, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(101, 101, 101, 1)',
                  'rgba(101, 101, 101, 1)',
                  'rgba(101, 101, 101, 1)',
                  'rgba(101, 101, 101, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}


function calcMean(yData, xData, newX) {
  yMean = yData.reduce(reducer)/yData.length;
  xMean = xData.reduce(reducer)/xData.length;

  y = [], x = [], mults = [], pows = [];

  for (let i = 0; i < yData.length; i++) {
    y[i] = yData[i] - yMean;
    x[i] = xData[i] - xMean;
    mults[i] = y[i] * x[i];
    pows[i] = x[i] * x[i];
  }

  multsTotal = mults.reduce(reducer);
  powsTotal = pows.reduce(reducer);

  m = multsTotal / powsTotal;
  b = yMean - m * xMean;

  return m * newX + b
}


