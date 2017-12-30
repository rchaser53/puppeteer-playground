const recreateChartImage = (id, targetSrc) => {
  let chart = document.querySelector(`#${id}`)
  if (chart != null) {
    document.body.removeChild(chart)
    chart = null
  }

  let newImage = document.createElement('img')
  newImage.src = `${targetSrc}?${Date.now()}`
  newImage.id = id
  document.body.appendChild(newImage)
}

window.onload = () => {
  setInterval(async () => {
    try {
      const fetchObject = await fetch('http://localhost:3000/btc_usd')
      document.title = await fetchObject.text()

      recreateChartImage('chart', 'img/chart.png')
    } catch (err) {
      console.error(err)
    }
  }, 60000)
}