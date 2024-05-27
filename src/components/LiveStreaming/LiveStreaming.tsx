import React, { useEffect, useRef } from 'react';

const LiveStreaming: React.FC = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('我加载了')
    // 确保DOM已加载完毕
    if (videoRef.current) {
      // 初始化推流器实例
      const livePusher = new TXLivePusher();

      // 设置视频渲染容器
      livePusher.setRenderView(videoRef.current);

      // 静音视频View以避免回声
      livePusher.videoView.muted = true;

      // 设置音视频质量
      livePusher.setVideoQuality('720p');
      livePusher.setAudioQuality('standard');

      // 开始采集摄像头和麦克风
      Promise.all([
        livePusher.startCamera().catch(error => console.error('摄像头开启失败:', error)),
        livePusher.startMicrophone().catch(error => console.error('麦克风开启失败:', error)),
      ]).then(() => {
        // 成功开启后开始推流
        const pushUrl = 'webrtc://domain/AppName/StreamName?txSecret=xxx&txTime=xxx';
        livePusher.startPush(pushUrl);
      });

      // 清理函数
      return () => {
        // 停止推流
        livePusher.stopPush();
        // 停止采集
        livePusher.stopCamera();
        livePusher.stopMicrophone();
      };
    }
  }, []); // 空依赖数组保证只在挂载和卸载时运行

  return (
    <div>
      <div id="local_video" ref={videoRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default LiveStreaming;