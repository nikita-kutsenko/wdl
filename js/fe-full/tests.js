

// 1. VARIABLES 
// divs  
let test_block = document.getElementById("test");
let answers_block = document.getElementById("answers");
// testing
let testCTA_toState1 = document.getElementById("testCTA_toState1");
let testCTA_toState2 = document.getElementById("testCTA_toState2");
let testCTA_toState3 = document.getElementById("testCTA_toState3");
// charts 
let charts_block = document.getElementById("charts");
let chart_in_trend = document.getElementById("chart_in");
let chart_jun_trend = document.getElementById("chart_jun");
let charts_default_block = document.getElementById("charts_default");
let charts_headline = document.getElementById("charts-headline");
let charts_desc = document.getElementById("charts-desc");
let charts_title = document.getElementById("charts-title");
let charts_years = document.getElementById("charts-years");
let charts_desc_more = document.getElementById("charts-desc_more");
let charts_title_more = document.getElementById("charts-title_more");
let charts_years_more = document.getElementById("charts-years_more");
// buttons 
let start_btn = document.getElementById("start");
// tests
let user_answers = new Array(),
    current_test = -1;
let test_params_count = 0;
// result data for percents 
let test_params = {
  complexity: [],
  categories: []
};
let isFullTest = true;
let result_data = {
    html: {
      total: new Number(),
      arr: new Array()
    },
    css: {
      total: new Number(),
      arr: new Array()
    },
    js: {
      total: new Number(),
      arr: new Array()
    }
  },
  res_total = new Number(),
  res_categories_amount = 3;
// resut data for links 
let result_links = {
        recs: [],
        refresh: [],
        learn: []
    },
    recs_code = new String(), 
    refresh_code = new String(),
    learn_code = new String(),
    user_answers_result = new String();  


// 2. CLASS 
class Tasks{
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

let tests, tests_before_complexity, tests_before_categories, links;
new Tasks("/data/fe-full/tests copy.json").getData().then(data => {tests_before_categories = data}),
new Tasks("/data/fe-full/links.json").getData().then(data => {links = data});


// 3. FUNCTIONS 
// rendering links for the result list
function render_links() {
    if (result_links.refresh.length > 0 ) {
      refresh_code = `<div class="result-links">
                        <p class="result-links-title">What to refresh in the memory:</p>`
      for (let i = 0; i < result_links.refresh.length; i++) {
          refresh_code += `<div class="result-links-line">
                              <p class="result-links-line-text">${result_links.refresh[i].category} “${result_links.refresh[i].theme}”:</p>
                              <a href="${result_links.refresh[i].link}" target=”_blank” class="result-links-line-link">Go to</a>
                          </div>`
      }
      refresh_code += `</div>`
    } else {
      refresh_code = ''
    }

    if (result_links.recs.length > 0) {
      recs_code = `<div class="result-links">
                    <p class="result-links-title">Recommendations:</p>`   
      for (let i = 0; i < result_links.recs.length; i++) {
          recs_code += `<div class="result-links-line">
                            <p class="result-links-line-text">${result_links.recs[i].category} “${result_links.recs[i].theme}”:</p>
                            <a href="${result_links.recs[i].link}" target=”_blank” class="result-links-line-link">Go to</a>
                        </div>`
      }
      recs_code += `</div>`
    } else {
      recs_code = ''
    }
    
    if (result_links.learn.length > 0) {
      learn_code = `<div class="result-links">
                      <p class="result-links-title">What to learn:</p>`
      for (let i = 0; i < result_links.learn.length; i++) {
          learn_code += `<div class="result-links-line">
                            <p class="result-links-line-text">${result_links.learn[i].category} “${result_links.learn[i].theme}”:</p>
                            <a href="${result_links.learn[i].link}" target=”_blank” class="result-links-line-link">Go to</a>
                        </div>`
      }
      learn_code += `</div>`
    } else {
      learn_code = ''
    }
    
}
// getting links for the result list
function load_links() {
    for (let i = 0; i < user_answers.length; i++) {
        if (user_answers[i].value === "0.8") {
            result_links.refresh.push({
                id: user_answers[i].id,
                link: links[i].refresh.link,
                theme: links[i].refresh.theme,
                value: user_answers[i].value,
                category: user_answers[i].category,
            })
        } else if (user_answers[i].value === "0.2") {
            result_links.recs.push({
                id: user_answers[i].id,
                link: links[i].recommendation.link,
                theme: links[i].recommendation.theme,
                value: user_answers[i].value,
                category: user_answers[i].category,
            })
        } else if (user_answers[i].value === "-1") {
            result_links.learn.push({
                id: user_answers[i].id,
                link: links[i].learn.link,
                theme: links[i].learn.theme,
                value: user_answers[i].value,
                category: user_answers[i].category,
            })
        }
    }

    console.log(result_links)
    render_links()
}
//calculation of the results in %
function calc_result() {
    // create the array for all categories to count the % in the result 
    for (let i = 0; i < user_answers.length; i++) {
        if (user_answers[i].category === "HTML") result_data.html.arr.push(user_answers[i].value)
        else if (user_answers[i].category === "CSS") result_data.css.arr.push(user_answers[i].value)
        else if (user_answers[i].category === "JavaScript") result_data.js.arr.push(user_answers[i].value)
    }

    console.log(result_data)

    // count the result percent for each category
    for (let item in result_data) {
        for (let i = 0; i < result_data[item].arr.length;  i++) {
            if (result_data[item].arr[i] === "-1") {result_data[item].total += 0}
            else {result_data[item].total += +result_data[item].arr[i]}
        }
        result_data[item].total = 100 * result_data[item].total / result_data[item].arr.length;
        console.log('result_data[item].total :>> ', result_data[item].total);
        isNaN(result_data[item].total) ? res_total += 0 : res_total += result_data[item].total;
        if (isNaN(result_data[item].total)) res_categories_amount--;
    }
    console.log(result_data)

    load_links()
}
// getting answers that user chose
function get_user_answers () {
    if (!document.querySelector('input[name="answersList-radio"]:checked')) return;

    let user_answer_temp = document.querySelector('input[name="answersList-radio"]:checked').value
    let user_data = new Object();
    user_data.id = tests[current_test].id;
    for (let i = 0; i < tests[current_test].answersList.length; i++) {
        if (user_answer_temp === tests[current_test].answersList[i].answer) {
            user_data.answer = tests[current_test].answersList[i].answer
            user_data.value = tests[current_test].answersList[i].value
            user_data.category = tests[current_test].category
        }
    }
    user_answers.push(user_data);

    current_test++
}
//loading answers for the test
function load_answers (data) {
    let answers = new String();
    for (let i = 0; i < data.length; i++) {
        answers += `<li class="card-answers-answer">
                        <input class="card-answers-answer-radio" type="radio" name="answersList-radio" value="${data[i].answer}">
                        <span class="card-answers-answer-checkmark">${data[i].answer}</span>
                    </li>`
    }
    console.log(answers)
    return answers
}

function renderUserAnswersResult () {
  user_answers_result += `<div class="answers">
                            <p class="answers-headline">Answers result</p>
                            <p class="answers-desc">In this block you can see all your answers</p>
                            <div class="answers-container">`
  for (let block = 0; block < user_answers.length; block++ ) {
    let user_answers_block = `<div class="answers-container-block">
                            <p class="answers-container-block-title">Test ${block + 1} of ${user_answers.length}</p>
                            <p class="answers-container-block-title">Question:</p>
                            <p class="answers-container-block-question">${tests[block].question}</p>
                            <p class="answers-container-block-title">Answers:</p>
                            <ul class="answers-container-block-answers">`

    for (let answer = 0; answer < tests[block].answersList.length; answer++ ) {
      let userClick = user_answers[block].answer === tests[block].answersList[answer].answer ? ' userClicked' : '';
      let correctAnswer = tests[block].answersList[answer].value === "1" ? ' true' : '';
      user_answers_block += `<li class="answers-container-block-answers-answer">
                              <span class="answers-container-block-answers-answer-checkmark${userClick}${correctAnswer}">${tests[block].answersList[answer].answer}</span>
                            </li>`
    }

    user_answers_block += `</ul></div>`
    user_answers_result += `${user_answers_block}`
  }

  user_answers_result += `</div></div>`
}

function displayCharts() {
  if (!isFullTest) {
    charts_default_block.style.display = "flex";
    return;
  } else {
    charts_block.style.display = "flex"
    
    if (50 > result_data.html.total) {
      if (50 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result on HTML/CSS. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML/CSS, but you have great skills on JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more about HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML/CSS, but you have great skills on JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 <= result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on CSS! We highly recommend you to learn more about HTML & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on CSS! We highly recommend you to learn more about HTML & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML, but you have great skills on CSS & JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      }
    } else if (75 > result_data.html.total) {
      if (50 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result on HTML/CSS. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML/CSS, but you have great skills on JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more about HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more about HTML/CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML/CSS, but you have great skills on JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 <= result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on CSS! We highly recommend you to learn more about HTML & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on CSS! We highly recommend you to learn more about HTML & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on HTML, but you have great skills on CSS & JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      }
    } else if (75 <= result_data.html.total) {
      if (50 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on HTML!  We highly recommend you to learn more about CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result on CSS, but you have great skills on HTML!  We highly recommend you to learn more about CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on CSS, but you have great skills on HTML & JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more about HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 > result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on HTML! We highly recommend you to learn more about CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Ooops`;
          charts_desc.innerHTML =`Unfortunately you passed test with low result, but you have great skills on CSS! We highly recommend you to learn more about CSS & JavaScript and then you can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on CSS, but you have great skills on HTML & JavaScript! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          charts_desc_more.innerHTML =`We highly recommend you to learn more HTML/CSS and then you can pretend to the position of the Junior Front-end developer`;
          charts_title_more.innerHTML =`Junior Front-End developers salaries`;
          charts_years_more.innerHTML =`June 2019 - Trend up to June 2021`;
          charts_desc_more.style.display = "block";
          charts_title_more.style.display = "block";
          charts_years_more.style.display = "block";
          chart_jun_trend.style.display = "block";
        }
      } else if (75 <= result_data.css.total) {
        if (30 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on JavaScript, but you have great skills on HTML/CSS! You can pretend to the position of the Intern/Trainee Front-end developer`;
          charts_title.innerHTML = `Intern/Trainee Front-End developers salaries`;
          charts_years.innerHTML = `December 2020 - Trend up to June 2021`;
          chart_in_trend.style.display = "block";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "none";
        } else if (60 > result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! Unfortunately you passed test with low result on JavaScript, but you have great skills on HTML/CSS! You can pretend to the position of the Junior Front-end developer`;
          charts_title.innerHTML = `Junior Front-End developers salaries`;
          charts_years.innerHTML = `June 2019 - Trend up to June 2021`;
          chart_in_trend.style.display = "none";

          // hide
          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "block";
        } else if (60 <= result_data.js.total) {
          // show 
          charts_headline.innerHTML =`Job for you!`;
          charts_desc.innerHTML =`From your results of the test, we found a job for you! You have great skills on HTML/CSS & JavaScript! You can pretend to the position of the Junior Front-end developer. Moreover, we recommend you to learn frameworks like Vue, React, Angular. These frameworks will allow you to know more and increase your chances of getting the job offer!`;
          charts_title.innerHTML = `Junior Front-End developers salaries`;
          charts_years.innerHTML = `June 2019 - Trend up to June 2021`;
          chart_in_trend.style.display = "none";

          charts_desc_more.style.display = "none";
          charts_title_more.style.display = "none";
          charts_years_more.style.display = "none";
          chart_jun_trend.style.display = "block";
        }
      }
    }

        // charts_headline.innerHTML =`Ooops`;
        // charts_desc.innerHTML =`Unfortunately you passed test with low result. We highly recommend you to learn more HTML && CSS and you can pretend to the position of the Intern/Trainee Front-end developer`;
  }
}

// displaying tests
function display_test () {
    current_test === -1 ? current_test++ : get_user_answers()
    if (current_test != tests.length) {
        console.dir(tests)
        console.log(current_test)
        test_block.innerHTML = `<form class="card" id="card">
                                  <p class="card-headline">Task ${current_test + 1} of ${tests.length}</p>
                                  <p class="card-title">Question:</p>
                                  <p class="card-question">${tests[current_test].question}</p>
                                  <p class="card-title">Answers:</p>
                                  <ul class="card-answers">${load_answers(tests[current_test].answersList)}</ul>
                                  <span class="card-submit" onclick="next_task()">Next task</span>      
                              </form>`
    } else {
        console.dir(links)
        console.log(current_test)
        calc_result()
        renderUserAnswersResult();
        test_block.innerHTML = `<div class="result">
                                  <p class="result-headline">Result</p>
                                  <div class="result-total">
                                      <p class="result-total-text">Total result:</p>
                                      <p class="result-total-number">${Math.round(res_total/res_categories_amount)}%</p>
                                  </div>
                                  <div class="result-topics">
                                      ${
                                        isNaN(result_data.html.total) 
                                        ? "" 
                                        : `<div class="result-topics-topic">
                                          <p class="result-topics-topic-text">HTML result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.html.total)}%</p>
                                        </div>`
                                    }
                                      ${
                                        isNaN(result_data.css.total) 
                                        ? "" 
                                        : `<div class="result-topics-topic">
                                          <p class="result-topics-topic-text">CSS result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.css.total)}%</p>
                                        </div>`
                                    }
                                      ${
                                        isNaN(result_data.js.total) 
                                        ? "" 
                                        : `<div class="result-topics-topic">
                                          <p class="result-topics-topic-text">JavaScript result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.js.total)}%</p>
                                        </div>`
                                    }
                                  </div>

                                  ${refresh_code}
                                  ${recs_code}
                                  ${learn_code}
                              </div>`

        answers_block.innerHTML = user_answers_result;
        displayCharts();
    }
}

// displaying tests
function display_test_toState () {
  console.log(result_data);
  // calc_result()
  renderUserAnswersResult();
  test_block.innerHTML = `<div class="result">
                            <p class="result-headline">Result</p>
                            <div class="result-total">
                                <p class="result-total-text">Total result:</p>
                                <p class="result-total-number">${Math.round(res_total/res_categories_amount)}%</p>
                            </div>
                            <div class="result-topics">
                                ${
                                  isNaN(result_data.html.total) 
                                  ? "" 
                                  : `<div class="result-topics-topic">
                                    <p class="result-topics-topic-text">HTML result:</p>
                                    <p class="result-topics-topic-number">${Math.round(result_data.html.total)}%</p>
                                  </div>`
                              }
                                ${
                                  isNaN(result_data.css.total) 
                                  ? "" 
                                  : `<div class="result-topics-topic">
                                    <p class="result-topics-topic-text">CSS result:</p>
                                    <p class="result-topics-topic-number">${Math.round(result_data.css.total)}%</p>
                                  </div>`
                              }
                                ${
                                  isNaN(result_data.js.total) 
                                  ? "" 
                                  : `<div class="result-topics-topic">
                                    <p class="result-topics-topic-text">JavaScript result:</p>
                                    <p class="result-topics-topic-number">${Math.round(result_data.js.total)}%</p>
                                  </div>`
                              }
                            </div>

                            ${refresh_code}
                            ${recs_code}
                            ${learn_code}
                        </div>`

  answers_block.innerHTML = user_answers_result;
  displayCharts();
}

// go to the next task
function next_task (){
  if (test_params_count < 4) {
    get_test_params();
    return;
  }
  console.log("isFullTest", isFullTest);
  console.log("clicked start")
  display_test()
  console.log('tests :>> ', tests);
  console.log('user_answers :>> ', user_answers);
}

function get_fromUser_test_params(name) {
  if (!document.querySelector(`input[name="${name}"]:checked`)) return;

  let test_params_temp_list = document.querySelectorAll(`input[name="${name}"]:checked`);
  let test_params_temp_arr = Array.prototype.slice.call(test_params_temp_list); 
  console.log('test_params_temp_arr :>> ', test_params_temp_arr);
  for (let i = 0; i < test_params_temp_arr.length; i++ ) {
    name === "categories" 
    ? test_params.categories.push(test_params_temp_arr[i].value) 
    : test_params.complexity.push(test_params_temp_arr[i].value)
  }

  if (name === "categories") {
    if (test_params.categories.length !== 3) isFullTest = false;
  } else {
    if (test_params.complexity.length !== 3) isFullTest = false;
  }
  console.log('test_params', test_params)
  test_params_count++
}

function inCategories(test) {
  for (let i = 0; i < test_params.categories.length; i++) {
    console.log("isFullTest, test_params.categories[i]", i, isFullTest, test_params.categories[i]);
    if (test.category === test_params.categories[i]) return true;
  }
  return false;
}

function inComplexity(test) {
  for (let i = 0; i < test_params.complexity.length; i++) {
    console.log("isFullTest, test_params.complexity[i]", isFullTest, test_params.complexity[i]);
    if (test.complexity === test_params.complexity[i]) return true;
  }
  return false;
}

function get_test_params() {
  if (test_params_count === 0) {
    test_block.innerHTML = `<!-- title  -->
                            <h2 class="test-title">CATEGORIES</h2>
                            <!-- description  -->
                            <h3 class="test-desc">Choose the categories, on which you wont to get tests.For getting the recommendations of the job, please select all categories. Otherwise, you will get just a statistic of jobs due past 2 years</h3>
                            <!-- form for selecting topics  -->
                            <ul class="list">
                              <li class="list-item">
                                <input class="list-item-checkbox" type="checkbox" name="categories" value="HTML">
                                <span class="list-item-checkmark">HTML</span>
                              </li>
                              <li class="list-item">
                                <input class="list-item-checkbox" type="checkbox" name="categories" value="CSS">
                                <span class="list-item-checkmark">CSS</span>
                              </li>
                              <li class="list-item">
                                <input class="list-item-checkbox" type="checkbox" name="categories" value="JavaScript">
                                <span class="list-item-checkmark">JavaScript</span>
                              </li>
                            </ul>
                            <!-- start the test  -->
                            <span id="start" onclick="next_task()" class="test-start">next</span>`
    test_params_count++;
  }
  if (test_params_count === 1) {
    get_fromUser_test_params("categories");
    console.log("isFullTest", isFullTest);
    tests_before_complexity = tests_before_categories.filter(inCategories)
    console.log(tests_before_complexity)
  }
  if (test_params_count === 2) {
    test_block.innerHTML = `<!-- title  -->
                            <h2 class="test-title">TOPICS</h2>
                            <!-- description  -->
                            <h3 class="test-desc">Choose the complexity of testing.For getting the recommendations of the job, please select all complexities. Otherwise, you will get just a statistic of jobs due past 2 years</h3>
                            <!-- form for selecting topics  -->
                            <ul class="list">
                              ${
                                tests_before_complexity.find(item => item.complexity === "easy") === undefined 
                                ? "" 
                                : `<li class="list-item">
                                  <input class="list-item-checkbox" type="checkbox" name="complexity" value="easy">
                                  <span class="list-item-checkmark">Easy</span>
                                </li>`
                              } 
                              ${
                                tests_before_complexity.find(item => item.complexity === "normal") === undefined 
                                ? "" 
                                : `<li class="list-item">
                                  <input class="list-item-checkbox" type="checkbox" name="complexity" value="normal">
                                  <span class="list-item-checkmark">Normal</span>
                                </li>`
                              } 
                              ${
                                tests_before_complexity.find(item => item.complexity === "advanced") === undefined 
                                ? "" 
                                : `<li class="list-item">
                                  <input class="list-item-checkbox" type="checkbox" name="complexity" value="advanced">
                                  <span class="list-item-checkmark">Advanced</span>
                                </li>`
                              } 
                            </ul>
                            <!-- start the test  -->
                            <span id="start" onclick="next_task()" class="test-start">start the test</span>`
    test_params_count++;

  }
  if (test_params_count === 3) {
    get_fromUser_test_params("complexity");
    console.log("isFullTest", isFullTest);
    tests = tests_before_complexity.filter(inComplexity);
    console.log(tests)
  }
  if (test_params_count === 4) next_task()
}

//Ooops nth found
function goToState1 (){
  current_test = 30;
  result_data.html.total = 30;
  result_data.css.total = 30;
  result_data.js.total = 15;
  display_test_toState();
}
//intern
function goToState2 (){
  current_test = 30;
  result_data.html.total = 30;
  result_data.css.total = 30;
  result_data.js.total = 90;
  display_test_toState();
}
//junior
function goToState3 (){
  current_test = 30;
  result_data.html.total = 90;
  result_data.css.total = 90;
  result_data.js.total = 90;
  display_test_toState();
}
