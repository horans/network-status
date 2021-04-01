/***********************************************************
 * project: network status detection                       *
 * description: detect connection changes                  *
 * author: horans@gmail.com                                *
 * url: https://github.com/horans/network-status-detection *
 * update: 210401                                          *
 ***********************************************************/
/* global bootstrap */

window.addEventListener('load', () => {
  // getbootstrap.com/docs/5.0/components/offcanvas
  const offlineCover = document.getElementById('offcanvasOffline')
  const offlineOffcanvas = new bootstrap.Offcanvas(offlineCover, {
    keyboard: false
  })

  // timestamp
  let timestamp = Date.now()
  let timeOnline = 0
  const timeStart = timestamp

  // developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
  const status = document.getElementById('status')
  const log = document.getElementById('log')

  function updateOnlineStatus (event) {
    const condition = navigator.onLine ? 'online' : 'offline'

    // change status
    status.className =
      'badge bg-' + (condition === 'online' ? 'success' : 'warning')
    status.innerText = condition.toUpperCase()

    // update last time
    const timeChange = new Date()
    const timeLast = timeChange.valueOf() - timestamp
    if (condition === 'offline') timeOnline += timeLast
    if (log.querySelector('td:last-child')) {
      log.querySelector('tr:last-child > td:last-child').innerText =
        Math.round(timeLast / 1000) + 's'
    }
    timestamp = timeChange.valueOf()

    // add log
    const entry =
      '<tr><th>' +
      condition.substring(0, condition.length - 'line'.length).toUpperCase() +
      '</th><td>' +
      timeChange.toString() +
      '</td><td><span class="spinner-grow spinner-grow-sm text-' +
      (condition === 'online' ? 'success' : 'warning') +
      '" role="status"></span></td></tr>'
    log.insertAdjacentHTML('beforeend', entry)

    // toggle offcanvas
    if (document.getElementById('useOffcanvas').checked) {
      if (condition === 'online') {
        offlineOffcanvas.hide()
      } else {
        offlineOffcanvas.show()
      }
    }
  }

  // add trigger
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  // initial check
  updateOnlineStatus()

  // update uptime
  setInterval(() => {
    const timeCheck = Date.now()
    document.getElementById('uptime').innerText = (
      ((timeOnline + (navigator.onLine ? timeCheck - timestamp : 0)) * 100) /
      (timeCheck - timeStart)
    ).toFixed(2)
  }, 3000)
})
