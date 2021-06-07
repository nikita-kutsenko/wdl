// rendering links for the result list
export function render_links() {
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
export function load_links() {
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