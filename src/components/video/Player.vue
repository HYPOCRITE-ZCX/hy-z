<template>
<!--  <div>-->
    <video-player class="video-player vjs-custom-skin"
                  :playsinline="true"
                  ref="videoPlayer"
                  :options="playerOptions">
    </video-player>
<!--    <q-media-player-->
<!--      type="video"-->
<!--      background-color="black"-->
<!--      :muted="muted"-->
<!--      :autoplay="false"-->
<!--      :show-big-play-button="true"-->
<!--      :sources="video.sources"-->
<!--      :poster="video.poster"-->
<!--      :tracks="video.tracks"-->
<!--      track-language="English"-->
<!--      @ended="onEnded">-->
<!--      :bottom-controls="true"-->
<!--      @playing="isPlaying = true"-->
<!--      @paused="isPlaying = false"-->
<!--      ref="qmp"-->
<!--      <template v-slot:controls>-->
<!--        <div class="column text-white bg-teal q-pa-md q-mt-xs">-->
<!--          <div class="row">-->
<!--            <q-btn size="md" class="q-ml-sm" :icon="isPlaying ? 'stop': 'play_arrow'" @click="$refs.qmp.togglePlay()" outline></q-btn>-->
<!--            <q-space></q-space>-->
<!--            <q-btn @click="$refs.qmp.toggleFullscreen()" flat icon="fullscreen"></q-btn>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </q-media-player>-->
<!--  </div>-->
</template>

<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  export default {
    name: "Playler",
    data () {
      return{
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          controls: true, //控制条
          preload: 'auto', //视频预加载
          muted: false, //默认情况下将会消除任何音频。
          loop: false, //导致视频一结束就重新开始。
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            // type: 'video/flv',
            src: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov'//你所放置的视频的地址，最好是放在服务器上
          }],
          require: ('../../assets/20201121-3.jpg'), //你的封面地址（覆盖在视频上面的图片）
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂时无法播放' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        },
        isPlaying: false,
        video: {
          label: 'Tears of Steel',
          poster: require('../../assets/20201121-3.jpg'),
          sources: [
            {
              src: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov',
              type: 'video/mp4'
            }
          ],
          tracks: [
            {
              src: 'media/TearsOfSteel/TOS-en-us.vtt',
              kind: 'subtitles',
              srclang: 'en-us',
              label: 'English'
            },
            {
              src: 'media/TearsOfSteel/TOS-zh-hans.vtt',
              kind: 'subtitles',
              srclang: 'zh-hans',
              label: 'Chinese'
            }
          ]
        }
      }
    },
    methods: {
      onEnded(){
        alert("视频播放完毕")
      }
    }
  }
</script>

<style scoped>

</style>
