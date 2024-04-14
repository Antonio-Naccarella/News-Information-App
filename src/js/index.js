import "../css/styles.css"
import icon from "../img/favicon.ico"
import arrow from "../img/arrow.png"
import axios from "axios"
const _ = require("lodash")

const article = document.querySelector("article")
const btn = document.querySelector("button")
let indexIds = 0
let maxIndexIds = 10

fetchApi(process.env.URL_API).then((res) => {
  getNews(res.data)

  btn.addEventListener("click", () => loadMore(res.data))
})

function fetchApi(url) {
  return axios.get(url)
}
function getNews(newsIds) {
  let newsToDisplay = _.slice(newsIds, [indexIds], [maxIndexIds]).map((id) =>
    fetchApi(
      `${process.env.URL_API_NEWS_PART1}${id}${process.env.URL_API_NEWS_PART2}`
    ).catch((err) => alert("News not Found"))
  )

  axios
    .all(newsToDisplay)
    .then(
      axios.spread((...res) => {
        res = _.map(res, (item) => updateDisplay(item.data))
      })
    )
    .catch((err) => alert("News not Found"))
}

function updateDisplay(newsData) {
  const section = document.createElement("section")
  article.appendChild(section)
  const title = document.createElement("h2")
  title.textContent = newsData.title
  const line = document.createElement("div")
  line.className = "line"
  const link = document.createElement("a")
  link.className = "link"
  link.setAttribute("href", newsData.url)
  link.setAttribute("target", "_blank")
  link.textContent = "Read More"
  const time = document.createElement("p")
  time.textContent = `${new Date(newsData.time * 1000).toLocaleString()}`
  section.appendChild(title)
  section.appendChild(line)
  section.appendChild(time)
  section.appendChild(link)
}

function loadMore(data) {
  indexIds += 10
  maxIndexIds += 10
  getNews(data)
}
