```ts
<ReactPlayer
  ref={this.ref}
  className="react-player"
  width="100%"
  height="100%"
  url={url}
  pip={pip}
  playing={playing}
  controls={controls}
  light={light}
  loop={loop}
  playbackRate={playbackRate}
  volume={volume}
  muted={muted}
  onReady={() => console.log("onReady")}
  onStart={() => console.log("onStart")}
  onPlay={this.handlePlay}
  onEnablePIP={this.handleEnablePIP}
  onDisablePIP={this.handleDisablePIP}
  onPause={this.handlePause}
  onBuffer={() => console.log("onBuffer")}
  onPlaybackRateChange={this.handleOnPlaybackRateChange}
  onSeek={(e) => console.log("onSeek", e)}
  onEnded={this.handleEnded}
  onError={(e) => console.log("onError", e)}
  onProgress={this.handleProgress}
  onDuration={this.handleDuration}
  onPlaybackQualityChange={(e) =>
    console.log("onPlaybackQualityChange", e)
  }
/>
```

ref : 컴포넌트의 참조 값
url : 재생할 영상의 URL
playering : 영상 시작 이후 재생 여부
controls : 컨트롤러 표시 여부
light : 영상 시작 전 미리보기 이미지 표시 여부
loop : 반복 재생 여부
playbackRate : 재생 속도
volume : 볼륨
muted : 음소거 여부
onReady : 영상 준비 완료 시 호출되는 함수
onStart : 영상 시작 시 호출되는 함수
onPlay : 영상 재생 시 호출되는 함수
onEnablePIP : PIP 모드 활성화 시 호출되는 함수
onDisablePIP : PIP 모드 비활성화 시 호출되는 함수
onPause : 영상 일시 정지 시 호출되는 함수
onBuffer : 영상 버퍼링 시 호출되는 함수
onPlaybackRateChange : 재생 속도 변경 시 호출되는 함수
onSeek : 영상 재생 위치 변경 시 호출되는 함수
onEnded : 영상 재생 종료 시 호출되는 함수
onError : 영상 재생 중 오류 발생 시 호출되는 함수
onProgress : 영상 재생 중 호출되는 함수
onDuration : 영상 재생 시간이 변경될 때 호출되는 함수
onPlaybackQualityChange : 재생 품질이 변경될 때 호출되는 함수
