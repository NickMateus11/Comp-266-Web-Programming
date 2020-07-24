
import { videoList } from './videoData.js'


$( document ).ready(function() {
    const UTC_time = new Date()
    const iframe_width = 750;
    const iframe_height = 450;

    // ((UTC_time in ms -> minutes) - timezoneOffset in minutes) -> days in current timezone
    const currentDay = Math.floor((UTC_time.getTime() / (1000 * 60) - UTC_time.getTimezoneOffset()) / (60 * 24));
    const VoD = videoList[currentDay % videoList.length];

    const VoD_frame = document.createElement('iframe');
    VoD_frame.width = iframe_width;
    VoD_frame.height = iframe_height;
    VoD_frame.src = VoD.link;

    const VoD_element = document.getElementById("VoD_frame");
    VoD_element.innerHTML = VoD_frame.outerHTML;

    $('#VoD_frame iframe').attr('allowFullScreen', '');
    $('#VoD_frame iframe').attr('frameborder', '0');
});
