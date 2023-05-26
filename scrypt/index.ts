const bgImg = document.getElementsByClassName("background_img")[0] as HTMLElement;
const block_sum = document.getElementsByClassName("block_sum")[0] as HTMLElement;
block_sum.addEventListener("click", (e: Event) => onChangeBgImg(e));

const block_winter = document.getElementsByClassName("block_winter")[0] as HTMLElement;
block_winter.addEventListener("click", (e: Event) => onChangeBgImg(e));

const block_rain = document.getElementsByClassName("block_rain")[0] as HTMLElement;
block_rain.addEventListener("click", (e: Event) => onChangeBgImg(e));

const audio: HTMLElement | null = document.getElementById("audio") as HTMLMediaElement;

const range = document.getElementsByClassName("range")[0] as HTMLElement;
range.addEventListener("input", onChangeVolume);

let count: number | undefined;
let audioSourceId: string;

function onChangeVolume({ target }: Event) {
    if (audio instanceof HTMLMediaElement && target instanceof HTMLInputElement) {
        audio.volume = +target.value / 100;
    }
}

function onChangeBgImg({ currentTarget }) {
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

function onChangeSound(id: string) {
    let audioSource = document.getElementById(id);

    try {
        if (audioSourceId !== id) {
            count = undefined;
        }
        if (count == undefined) {
            if (audio instanceof HTMLMediaElement) {
                audio.src = audioSource?.getAttribute("src") || "";
                audio.load();
                audio.play();
                audioSourceId = id;
                return (count = 1);
            }
        }
        if (count) {
            let playPromise;
            if (audio instanceof HTMLMediaElement) {
                playPromise = audio?.play();
            }
            if (playPromise !== undefined) {
                playPromise
                    .then((_) => {
                        if (audio instanceof HTMLMediaElement) {
                            audio.pause();
                            count ? count-- : count;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            if (audio instanceof HTMLMediaElement) {
                audio.play();
                count ? count : count++;
            }
        }
    } catch (e) {
        console.log(e);
    }
}

