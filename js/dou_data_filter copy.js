class Dou{
  constructor(url) {
      this.url = url
  }

  async getData() {
      let response = await fetch ( this.url ),
          data = await response.json();
      console.log(data, "from getData");
      return Promise.resolve(data);
  }
}



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
  .getData()
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
    // console.log(user_20_dec, in_user_20_dec, jun_user_20_dec, in_sal_20_dec, AMOUNTS_in_sal_20_dec, 'user_20_dec, in_user_20_dec, jun_user_20_dec, in_sal_20_dec, AMOUNTS_in_sal_20_dec') 
  })
  .then( () => {
    chart_in_20_dec()
    chart_jun_20_dec()
  })
function chart_in_20_dec () {
  var ctx = document.getElementById('chart_in_20_dec').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_in_sal_20_dec.amount,
          datasets: [{
              label: 'Front-end Intern/Trainee developers. December 2020',
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
function chart_jun_20_dec () {
  var ctx = document.getElementById('chart_jun_20_dec').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_jun_sal_20_dec.amount,
          datasets: [{
              label: 'Front-end Junior developers. December 2020',
              data: AMOUNTS_jun_sal_20_dec.salaries,
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
  .getData()
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
    chart_jun_20_jun()
  })
function chart_jun_20_jun () {
  var ctx = document.getElementById('chart_jun_20_jun').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_jun_sal_20_jun.amount,
          datasets: [{
              label: 'Front-end Junior developers. June 2020',
              data: AMOUNTS_jun_sal_20_jun.salaries,
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



// 2019 DEC
let all_user_19_dec, jun_user_19_dec, jun_sal_19_dec;
let AMOUNTS_jun_sal_19_dec = {
  salaries: [],
  amount: []
}
new Dou("/dou/2019_dec_raw.json")
  .getData()
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
    chart_sal_19_dec()
  })
function chart_sal_19_dec () {
  var ctx = document.getElementById('chart_jun_19_dec').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_jun_sal_19_dec.amount,
          datasets: [{
              label: 'Front-end Junior developers. December 2019',
              data: AMOUNTS_jun_sal_19_dec.salaries,
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



// 2019 JUN
let all_user_19_jun, jun_user_19_jun, jun_sal_19_jun;
let AMOUNTS_jun_sal_19_jun = {
  salaries: [],
  amount: []
}
new Dou("/dou/2019_june_raw.json")
  .getData()
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
    chart_sal_19_jun()
  })
function chart_sal_19_jun () {
  var ctx = document.getElementById('chart_jun_19_jun').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: AMOUNTS_jun_sal_19_jun.amount,
          datasets: [{
              label: 'Front-end Junior developers. June 2019',
              data: AMOUNTS_jun_sal_19_jun.salaries,
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