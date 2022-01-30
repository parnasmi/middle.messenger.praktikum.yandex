import template from './index.hbs'

document.addEventListener('DOMContentLoaded', function() {
  console.log('template',template)
  document.body.innerHTML = template({fullName: 'Ilhom Maks'})
})
