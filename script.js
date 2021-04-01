/***********************************************************
 * project: network status detection                       *
 * description: detect connection changes                  *
 * author: horans@gmail.com                                *
 * url: https://github.com/horans/network-status-detection *
 * update: 210401                                          *
 ***********************************************************/
/* global bootstrap */

// getbootstrap.com/docs/5.0/components/offcanvas
const offlineCover = document.getElementById('offcanvasOffline')
const offlineOffcanvas = new bootstrap.Offcanvas(offlineCover, {
  keyboard: false
})

window.addEventListener('load', () => {
  // developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
  const status = document.getElementById('status')
  const log = document.getElementById('log')

  function updateOnlineStatus (event) {
    const condition = navigator.onLine ? 'online' : 'offline'

    // change status
    document.getElementById('note').className =
      condition === 'online' ? 'visible' : 'invisible'
    status.className =
      'badge bg-' + (condition === 'online' ? 'success' : 'warning')
    status.innerText = condition.toUpperCase()

    // add log
    const entry =
      '<tr><th>' +
      condition.substring(0, condition.length - 'line'.length).toUpperCase() +
      '</th><td>' +
      Date() +
      '</td></tr>'
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

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  // initial check
  updateOnlineStatus()
})
