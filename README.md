# IMUSIC-LLL
开发工具：HTML + CSS + JavaScript
项目类型：Web前端应用
项目简介：本项目制作了一个功能较为完整的网页音乐播放器，可以播放本地音乐文件。主要功能包括：播放/暂停、上一曲/下一曲、进度条控制、音量调节、播放列表管理等。

核心功能：
1.播放控制：播放/暂停、上下曲切换
2.进度管理：实时显示播放进度、显示音乐总时长和当前时间、进度条可点击跳转
3.音量控制：可滑动调节音量
4.播放列表：显示所有歌曲、点击歌曲可直接播放、当前播放歌曲显示高亮
5.键盘快捷键：空格键（暂停/播放）、左右箭头（上/下一曲）、上下箭头（增加/减少音量）

项目文件结构：
iMusic/
├── index.html          # 主页面文件（HTML结构）
├── style.css           # 样式文件（界面设计）
├── script.js           # 脚本文件（功能逻辑）
└── music/              # 音乐文件夹
    ├── qilixiang.mp3
    ├── LOST BOY.mp3
    ├── yequ.mp3
    └── xiangziyou.mp3

使用方法：
一、准备文件
1.创建项目文件IMusic
2.将index.html、style.css、script.js放入文件夹
3.在同一文件夹下创建music文件夹
二、添加音乐
1.准备MP3文件
2.将MP3文件放入music文件夹
3.确保文件名与代码中名称一致
三、运行项目
1.双击打开index.html
2.点击播放按钮开始播放

添加新歌曲：
1.将新的 MP3 文件放入music文件夹
2.打开script.js，在playlist数组中添加：
  const playlist = [
    // 原有歌曲...
    { 
        title: '新歌名', 
        artist: '歌手名', 
        duration: 240,  // 时长（秒）
        icon: '🎵',     // 图标
        audio: './music/新歌.mp3'
    }
];
3.打开 index.html，在播放列表中添加：
  <div class="playlist-item" data-index="4">
    <div class="playlist-item-info">
        <div class="playlist-item-title">新歌名</div>
        <div class="playlist-item-artist">歌手名</div>
    </div>
    <div class="playlist-item-duration">4:00</div>
</div>
