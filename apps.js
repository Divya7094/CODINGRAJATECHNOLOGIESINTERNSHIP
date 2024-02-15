let songs = [
    {
        name: 'Let Her Go',
        path: 'Let Her Go(PagalWorld).mp3',
        artist: 'Passenger',
        cover: 'song pic.jpg'
    },
    {
        name: 'Odhiyamma',
        path: 'song1.mp3',
        artist: 'Chinmayi, Dhruv Vikram, and Shruti Haasan',
        cover: 'song1.jpg'
    },
    {
        name: 'Darkside',
        path: 'song2.mp3',
        artist: 'Alan Walker',
        cover: 'song2.jpg'
    },
    {
        name: 'Oh sita hey rama',
        path: 'song3.mp3',
        artist: 'Ramya Behara, S. P. Charan, and Vishal Chandrasekhar',
        cover: 'song3.jpg'
    },
    {
        name: 'maamadura',
        path: 'song4.mp3',
        artist: 'Dhee and Santhosh Narayanan',
        cover: 'song4.jpg'
    },
    {
        name: 'Pehle bhi main',
        path: 'song5.mp3',
        artist: 'Raj Shekhar and Vishal Mishra',
        cover: 'song5.jpg'
    },
];

const carousel = [...document.querySelectorAll('.carousel img')];
let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}
setInterval(() => {
    changeCarousel();
}, 3000);

document.addEventListener("DOMContentLoaded", function () {
    const musicPlayerSection = document.querySelector('.music-player-section');
    let clickCount = 1;
    musicPlayerSection.addEventListener('click', () => {
        if (clickCount >= 2) {
            musicPlayerSection.classList.add('active');
            clickCount = 1;
            return;
        }
        clickCount++;
        setTimeout(() => {
            clickCount = 1;
        }, 250);
    });

    const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
    backToHomeBtn.addEventListener('click', () => {
        musicPlayerSection.classList.remove('active');
    });

    const playlistSection=document.querySelector('.playlist-section');
    const navBtn=document.querySelector('.music-player-section .nav-btn');
    navBtn.addEventListener('click',()=>{
        playlistSection.classList.add('active');
    })

    const songName=document.querySelector('.current-song-name');
    const artistName=document.querySelector('.artist-name');
    const coverImage=document.querySelector('.cover');

    const playPauseBtn = musicPlayerSection.querySelector('.controls .fas.fa-play');
    const pauseBtn = musicPlayerSection.querySelector('.controls .fas.fa-pause');
    const forwardBtn = musicPlayerSection.querySelector('.controls .fas.fa-forward');
    const backwardBtn = musicPlayerSection.querySelector('.controls .fas.fa-backward');
    const volumeBtn = musicPlayerSection.querySelector('.controls .fas.fa-volume-up');
    const volumeSlider = musicPlayerSection.querySelector('.volume-slider');
    const seekBar = musicPlayerSection.querySelector('.music-seek-bar');
    const currentMusicTime = musicPlayerSection.querySelector('.current-time');
    const musicDuration = musicPlayerSection.querySelector('.duration');

    let currentMusic = 0;

    const mainAudio = document.querySelector("#audio-source");

    const setMusic = (i) => {
        currentMusic = i;
        const song = songs[currentMusic];
        mainAudio.src = song.path;
        songName.innerHTML = song.name;
        artistName.innerHTML = song.artist;
        coverImage.src = song.cover;
        mainAudio.currentTime = 0;
        mainAudio.play(); 
    };
    setMusic(currentMusic);

    playPauseBtn.addEventListener('click', () => playMusic());
        pauseBtn.addEventListener('click', () => pauseMusic());

        function playMusic() {
            mainAudio.play();
            playPauseBtn.classList.remove('active');
            pauseBtn.classList.add('active');
        }

        function pauseMusic() {
            mainAudio.pause();
            pauseBtn.classList.remove('active');
            playPauseBtn.classList.add('active');
        }

    const forwardMusic = () => {
        currentMusic = (currentMusic + 1) % songs.length; 
        setMusic(currentMusic); 
    };

    const backwardMusic = () => {
        currentMusic = (currentMusic - 1 + songs.length) % songs.length; 
        setMusic(currentMusic); 
    };

    playPauseBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', pauseMusic);
    forwardBtn.addEventListener('click', forwardMusic);
    backwardBtn.addEventListener('click', backwardMusic);

    mainAudio.addEventListener('timeupdate', () => {
        const currentTime = mainAudio.currentTime;
            const duration = mainAudio.duration;
            currentMusicTime.textContent = formatTime(currentTime);
            musicDuration.textContent = formatTime(duration);
    });

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    seekBar.addEventListener('input', () => {
        mainAudio.currentTime = seekBar.value;
    });

const repeatBtn = document.getElementById('repeat-plist');

repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; 
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

const handleRepeatAndShuffle = () => {
    let getText = repeatBtn.innerText; 
    switch (getText) {
        case "repeat":
            nextMusic(); 
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; 
            loadMusic(currentMusic); 
            playMusic(); 
            break;
        case "shuffle":
            let randIndex = Math.floor(Math.random() * songs.length); 
            while (randIndex === currentMusic) { 
                randIndex = Math.floor(Math.random() * songs.length);
            }
            currentMusic = randIndex; 
            setMusic(currentMusic); 
            break;
    }
};

repeatBtn.addEventListener('click', handleRepeatAndShuffle);

    const toggleVolume = () => {
        volumeSlider.classList.toggle('active');
    };

    volumeBtn.addEventListener('click', toggleVolume);

    volumeSlider.addEventListener('input', () => {
        mainAudio.volume = volumeSlider.value;
    });

    const initializePlayer = () => {
    };
    initializePlayer();

    const queue = [...document.querySelectorAll('.queue')];

    const handleQueueItemClick = (index) => {
        setMusic(index); 
    };

    queue.forEach((item, index) => {
        item.addEventListener('click', () => {
            handleQueueItemClick(index);
        });
    });
    const library = [...document.querySelectorAll('.available-songs')];

    const handleLibraryItemClick = (index) => {
        setMusic(index); 
    };

    library.forEach((item, index) => {
        item.addEventListener('click', () => {
            handleLibraryItemClick(index);
        });
    });
});

