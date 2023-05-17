import { Button, Tooltip, Stack, Box } from '@mui/material';
import React, { useCallback } from 'react';
import GoToFullScreenButton from '../GoToFullScreenButton';
import { ParticipantCanvas, SelfVideo } from '../styles';
import { createPortal } from 'react-dom';
import NameTip from '../NameTip';
import CallPanel from '../CallPanel';

interface VideoProps {
  client: any;
  mediaScreen: any;
  participantCanvasRef: any;
  participantShareScreenRef: any;
}

const Video = ({
  client,
  mediaScreen,
  participantCanvasRef,
  participantShareScreenRef,
  setStatus,
}: VideoProps) => {
  const [videoStarted, setVideoStarted] = React.useState(false);
  const [audioStarted, setAudioStarted] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isSharedScreen, setIsSharedScreen] = React.useState(false);
  const [isSab, setIsSab] = React.useState(false);
  const [isSelfFullScreen, setIsSelfFullScreen] = React.useState(false);
  const [isParticipantFullScreen, setIsParticipantFullScreen] =
    React.useState(false);

  const isSupportWebCodecs = () => {
    return typeof window.MediaStreamTrackProcessor === 'function';
  };

  const startVideoButton = React.useCallback(async () => {
    if (!videoStarted) {
      if (!!window.chrome && !(typeof SharedArrayBuffer === 'function')) {
        setIsSab(false);
        await mediaScreen.startVideo({
          videoElement: document.querySelector('#self-view-video'),
        });
      } else {
        setIsSab(true);
        await mediaScreen.startVideo();
        mediaScreen.renderVideo('#self-view-canvas'),
          client.getCurrentUserInfo().userId,
          500,
          500,
          0,
          0,
          3;
      }
      setVideoStarted(true);
    } else {
      await mediaScreen.stopVideo();
      if (isSab) {
        mediaScreen.stopRenderVideo(
          document.querySelector('#self-view-canvas'),
          client.getCurrentUserInfo().userId
        );
      }
      setVideoStarted(false);
    }
  }, [mediaScreen, videoStarted, client, isSab]);

  const startAudioButton = useCallback(async () => {
    if (audioStarted) {
      console.log('-----------MutingAudio--------------');
      if (isMuted) {
        await mediaScreen.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaScreen.muteAudio();
        setIsMuted(true);
      }
    } else {
      console.log('-----------Connecting the audio--------------');
      await mediaScreen.startAudio();
      setAudioStarted(true);
    }
  }, [mediaScreen, audioStarted, isMuted]);

  const shareScreen = React.useCallback(async () => {
    if (isSharedScreen) {
      await mediaScreen.stopShareScreen();
      document.querySelector('#share-video').style.display = 'none';
      setIsSharedScreen(false);
    } else {
      if (isSupportWebCodecs()) {
        document.querySelector('#share-video').style.display = 'block';
        await mediaScreen.startShareScreen(
          document.querySelector('#share-video'),
          512,
          288,
          0,
          0,
          3
        );
      } else {
        await mediaScreen.startShareScreen(
          document.querySelector('#share-canvas'),
          512,
          288,
          0,
          0,
          3
        );
      }
      setIsSharedScreen(true);
    }
  }, [isSharedScreen, mediaScreen]);

  return (
    <Stack>
      <Stack direction={'row'} gap={'8px'}>
        {isSab ? (
          <Box position={'relative'}>
            <canvas id="self-view-canvas"></canvas>
            <GoToFullScreenButton
              setIsSelfFullScreen={setIsSelfFullScreen}
              isSelfFullScreen={isSelfFullScreen}
            />
            <NameTip isSelfFullScreen={isSelfFullScreen}></NameTip>
          </Box>
        ) : (
          <Box position={'relative'}>
            <SelfVideo
              id="self-view-video"
              isSelfFullScreen={isSelfFullScreen}
            ></SelfVideo>
            {!isSelfFullScreen ? (
              <GoToFullScreenButton
                changeShape={() => setIsSelfFullScreen(!isSelfFullScreen)}
                isSelfFullScreen={isSelfFullScreen}
              />
            ) : null}

            <NameTip isSelfFullScreen={isSelfFullScreen}></NameTip>
            {isSelfFullScreen ? (
              <CallPanel
                isSelfFullScreen={isSelfFullScreen}
                setIsSelfFullScreen={setIsSelfFullScreen}
                setIsParticipantFullScreen={setIsParticipantFullScreen}
                client={client}
                setStatus={setStatus}
                startVideoButton={startVideoButton}
                startAudioButton={startAudioButton}
                audioStarted={audioStarted}
                isMuted={isMuted}
                videoStarted={videoStarted}
              />
            ) : null}
          </Box>
        )}
        <Box position={'relative'}>
          <ParticipantCanvas
            isParticipantFullScreen={isParticipantFullScreen}
            id="participant-videos-canvas"
            ref={participantCanvasRef}
          ></ParticipantCanvas>
          {!isSelfFullScreen ? (
            <GoToFullScreenButton
              changeShape={() =>
                setIsParticipantFullScreen(!isParticipantFullScreen)
              }
              isParticipantFullScreen={isParticipantFullScreen}
            />
          ) : null}

          <NameTip isParticipantFullScreen={isParticipantFullScreen}></NameTip>
          {isParticipantFullScreen ? (
            <CallPanel
              setIsParticipantFullScreen={setIsParticipantFullScreen}
              isParticipantFullScreen={isParticipantFullScreen}
              setIsSelfFullScreen={setIsSelfFullScreen}
              client={client}
              setStatus={setStatus}
              startVideoButton={startVideoButton}
              startAudioButton={startAudioButton}
            />
          ) : null}
        </Box>
      </Stack>

      {!isSupportWebCodecs() ? (
        <canvas width={'512px'} height={'288px'} id="share-canvas"></canvas>
      ) : (
        <video
          style={{ maxWidth: '1024px', maxHeight: '576px' }}
          width={'1024px'}
          height={'576px'}
          id="share-video"
        ></video>
      )}

      <canvas
        id="participant-share"
        ref={participantShareScreenRef}
        style={{ maxWidth: '1024px', maxHeight: '576px' }}
        width={'1024px'}
        height={'576px'}
      ></canvas>

      <Tooltip title={videoStarted ? 'Stop Camera' : 'Start Camera'}>
        <Button onClick={startVideoButton}>Video</Button>
      </Tooltip>

      <Tooltip title={isSharedScreen ? 'Stop Sharing' : 'Start Sharing'}>
        <Button onClick={shareScreen}>Share</Button>
      </Tooltip>

      <Tooltip
        title={`${
          audioStarted ? (isMuted ? 'unmute' : 'mute') : 'Start Audio'
        }`}
      >
        <Button onClick={startAudioButton}>Audio</Button>
      </Tooltip>
    </Stack>
  );
};

export default Video;
