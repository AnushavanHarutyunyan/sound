var bgImg = document.getElementsByClassName("background_img")[0];
var block_sum = document.getElementsByClassName("block_sum")[0];
block_sum.addEventListener("click", function (e) { return onChangeBgImg(e); });
var block_winter = document.getElementsByClassName("block_winter")[0];
block_winter.addEventListener("click", function (e) { return onChangeBgImg(e); });
var block_rain = document.getElementsByClassName("block_rain")[0];
block_rain.addEventListener("click", function (e) { return onChangeBgImg(e); });
var audio = document.getElementById("audio");
var range = document.getElementsByClassName("range")[0];
range.addEventListener("input", onChangeVolume);
var count;
var audioSourceId;
function onChangeVolume(_a) {
    var target = _a.target;
    if (audio instanceof HTMLMediaElement && target instanceof HTMLInputElement) {
        audio.volume = +target.value / 100;
    }
}
function onChangeBgImg(_a) {
    var currentTarget = _a.currentTarget;
    switch (currentTarget.id) {
        case "#winter": {
            bgImg.classList.remove("rain", "summer");
            bgImg.classList.add("winter");
            onChangeSound("winter_source");
            break;
        }
        case "#rain": {
            bgImg.classList.remove("winter", "summer");
            bgImg.classList.add("rain");
            onChangeSound("rain_source");
            break;
        }
        case "#sum": {
            bgImg.classList.remove("winter", "rain");
            bgImg.classList.add("summer");
            onChangeSound("summer_source");
            break;
        }
    }
}
function onChangeSound(id) {
    var audioSource = document.getElementById(id);
    try {
        if (audioSourceId !== id) {
            count = undefined;
        }
        if (count == undefined) {
            if (audio instanceof HTMLMediaElement) {
                audio.src = (audioSource === null || audioSource === void 0 ? void 0 : audioSource.getAttribute("src")) || "";
                audio.load();
                audio.play();
                audioSourceId = id;
                return (count = 1);
            }
        }
        if (count) {
            var playPromise = void 0;
            if (audio instanceof HTMLMediaElement) {
                playPromise = audio === null || audio === void 0 ? void 0 : audio.play();
            }
            if (playPromise !== undefined) {
                playPromise
                    .then(function (_) {
                    if (audio instanceof HTMLMediaElement) {
                        audio.pause();
                        count ? count-- : count;
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        }
        else {
            if (audio instanceof HTMLMediaElement) {
                audio.play();
                count ? count : count++;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}