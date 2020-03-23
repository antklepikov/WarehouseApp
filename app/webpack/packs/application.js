import './react';
import Turbolinks from 'turbolinks';
import ReactOnRails from 'react-on-rails';
Turbolinks.start();
document.addEventListener("turbolinks:load", function () {
    ReactOnRails.reactOnRailsPageLoaded();
});