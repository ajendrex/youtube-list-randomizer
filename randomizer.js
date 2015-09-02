//First make sure to load all videos, clicking on the "load more" button
//#(.load-more-button").click();
url = "playlist_edit_service_ajax/?action_move_video_before=1";
token = encodeURIComponent($("[name='session_token']").value);
id_lista = encodeURIComponent($(".playlist-settings-editor").getAttribute("data-full-list-id"));
lista = document.getElementsByClassName("pl-video");
n = lista.length;
page_cl = encodeURIComponent(yt.getConfig("PAGE_CL"));
page_label = encodeURIComponent(yt.getConfig("PAGE_BUILD_LABEL"));
variants_checksum = encodeURIComponent(yt.getConfig("VARIANTS_CHECKSUM"));

var iteration = 0;

function f() {
  if (iteration > n) {
    window.clearInterval(iv);
  } else {
    iteration = iteration + 1;
    console.log("iteration " + iteration);
    r1 = Math.floor((Math.random() * n));
    r2 = Math.floor((Math.random() * n));
    id1 = encodeURIComponent(lista[r1].getAttribute("data-set-video-id"));
    id2 = encodeURIComponent(lista[r2].getAttribute("data-set-video-id"));
    parameters = "playlist_id=" + id_lista + "&set_video_id=" + id1 + "&moved_set_video_id_successor=" + id2 + "&session_token=" + token;
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("POST", url, true);
    ajaxRequest.setRequestHeader("X-Youtube-Page-CL",page_cl);
    ajaxRequest.setRequestHeader("X-Youtube-Page-Label",page_label);
    ajaxRequest.setRequestHeader("X-Youtube-Variants-Checksum",variants_checksum);
    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxRequest.send(parameters);
  }
}

//without pausing between post calls this didn't work, so we use setInterval function
var iv = window.setInterval(f, 1000);
