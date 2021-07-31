

// 1. VARIABLES 
// divs  
let test_block = document.getElementById("test");
let answers_block = document.getElementById("answers");
let charts_block = document.getElementById("charts");
// buttons 
let start_btn = document.getElementById("start");
// tests
let user_answers = new Array(),
    current_test = -1;
// result data for percents 
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
    res_total = new Number();
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

let tests,links;
new Tasks("../../../../data/fe-brief/tests.json").getData().then(data => {tests = data}),
new Tasks("../../../../data/fe-brief/links.json").getData().then(data => {links = data});


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
        res_total += result_data[item].total
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
    // user_data.id = tests[current_test].id;
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
                            <p class="answers-container-block-title">Test ${tests[block].id} of ${user_answers.length}</p>
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
// displaying tests
function display_test () {
    current_test === -1 ? current_test++ : get_user_answers()
    if (current_test != tests.length) {
        console.dir(tests)
        console.log(current_test)
        test_block.innerHTML = `<form class="card" id="card">
                                  <p class="card-headline">Task ${tests[current_test].id} of ${tests.length}</p>
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
                                      <p class="result-total-number">${Math.round(res_total/3)}%</p>
                                  </div>
                                  <div class="result-topics">
                                      <div class="result-topics-topic">
                                          <p class="result-topics-topic-text">HTML result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.html.total)}%</p>
                                      </div>
                                      <div class="result-topics-topic">
                                          <p class="result-topics-topic-text">CSS result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.css.total)}%</p>
                                      </div>
                                      <div class="result-topics-topic">
                                          <p class="result-topics-topic-text">JavaScript result:</p>
                                          <p class="result-topics-topic-number">${Math.round(result_data.js.total)}%</p>
                                      </div>
                                  </div>

                                  ${refresh_code}
                                  ${recs_code}
                                  ${learn_code}
                              </div>`

        answers_block.innerHTML = user_answers_result;
        charts_block.style.display = "flex"
    }
}

// go to the next task
function next_task (){
    console.log("clicked start")
    display_test()
    console.log('tests :>> ', tests);
    console.log('user_answers :>> ', user_answers);
}
// 4. EVENTS