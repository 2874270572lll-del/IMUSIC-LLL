const playlist = [
    { 
        title: '七里香', 
        artist: '周杰伦', 
        duration: 305, 
        icon: '🌸',
        audio: './music/qilixiang.mp3'  // 本地音频文件路径
    },
    { 
        title: 'LOST BOY', 
        artist: 'Troye Sivan', 
        duration: 263, 
        icon: '🎵',
        audio: './music/LOST BOY.mp3'
    },
    { 
        title: '夜曲', 
        artist: '周杰伦', 
        duration: 225, 
        icon: '🎸',
        audio: './music/yequ.mp3'
    },
    { 
        title: '想自由', 
        artist: '王安宇', 
        duration: 280, 
        icon: '🕊️',
        audio: './music/xiangziyou.mp3'
    }
];


const audio = new Audio();
audio.volume = 0.7; // 默认音量70%
let currentSongIndex = 0;    // 当前播放歌曲索引
let isPlaying = false;       // 播放状态
let volume = 70;             // 音量大小

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumArt = document.getElementById('albumArt');
const volumeSlider = document.getElementById('volumeSlider');
const playlistItems = document.querySelectorAll('.playlist-item');


function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}


function loadSong(index) {
    const song = playlist[index];
    audio.src = song.audio;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.textContent = song.icon;
    
    // 监听音频加载完成
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
}

// 更新进度条显示
function updateProgress() {
    if (!audio.duration) return;
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percentage + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

// 播放/暂停切换功能
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        // 切换为播放图标
        playBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    } else {
        audio.play().catch(err => {
            console.error('播放失败:', err);
            alert('音频播放失败，请检查网络连接或音频文件是否可用');
        });
        // 切换为暂停图标
        playBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="6" y1="4" x2="6" y2="20"></line>
                <line x1="18" y1="4" x2="18" y2="20"></line>
            </svg>
        `;
    }
    isPlaying = !isPlaying;
}

// 播放上一曲
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    updatePlaylistUI();
    
    // 如果正在播放，继续播放上一曲
    if (isPlaying) {
        audio.play().catch(err => {
            console.error('播放上一曲失败:', err);
        });
    }
}

// 播放下一曲
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    updatePlaylistUI();
    
    // 如果正在播放，继续播放下一曲
    if (isPlaying) {
        audio.play().catch(err => {
            console.error('播放下一曲失败:', err);
        });
    }
}

//高亮当前播放
function updatePlaylistUI() {
    playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 时间更新
audio.addEventListener('timeupdate', updateProgress);

// 播放结束
audio.addEventListener('ended', () => {
    console.log('歌曲播放完毕，自动播放下一曲');
    nextSong();
    // 确保自动播放下一曲
    setTimeout(() => {
        if (isPlaying) {
            audio.play().catch(err => {
                console.error('自动播放下一曲失败:', err);
            });
        }
    }, 100);
});

// 播放开始
audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="4" x2="6" y2="20"></line>
            <line x1="18" y1="4" x2="18" y2="20"></line>
        </svg>
    `;
});

// 播放暂停
audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
});

// 进度条点击跳转
progressBar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = audio.duration * percentage;
});

// 音量控制
volumeSlider.addEventListener('input', (e) => {
    volume = e.target.value;
    audio.volume = volume / 100;
});

// 播放列表项点击
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        updatePlaylistUI();
        
        // 自动播放
        audio.play().catch(err => {
            console.error('播放失败:', err);
        });
        isPlaying = true;
    });
});


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':  // 空格键：播放/暂停
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':  // 左箭头：上一曲
            prevSong();
            break;
        case 'ArrowRight':  // 右箭头：下一曲
            nextSong();
            break;
        case 'ArrowUp':  // 上箭头：增加音量
            e.preventDefault();
            volume = Math.min(100, volume + 10);
            volumeSlider.value = volume;
            audio.volume = volume / 100;
            break;
        case 'ArrowDown':  // 下箭头：减少音量
            e.preventDefault();
            volume = Math.max(0, volume - 10);
            volumeSlider.value = volume;
            audio.volume = volume / 100;
            break;
    }
});

// 加载第一首歌曲
loadSong(currentSongIndex);
