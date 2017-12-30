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

const updateTitle = (nextValue) => {
  document.title = nextValue
  localStorage.setItem('btcUsdCash', nextValue)
}

window.onload = () => {
  document.title = localStorage.getItem('btcUsdCash') || ''

  setInterval(async () => {
    try {
      const fetchObject = await fetch('http://localhost:3000/btc_usd')
      updateTitle(await fetchObject.text())

      recreateChartImage('chart', 'img/chart.png')
    } catch (err) {
      console.error(err)
    }
  }, 60000)
}