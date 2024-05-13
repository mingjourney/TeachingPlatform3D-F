import FaceTracker from '../EyeTracker/FaceTracker'
interface Props {
  handleTurnHead: any
}
const VideoInfoArgs: React.FC<Props> = ({ handleTurnHead }) => {
  return (
    <div>
      <FaceTracker handleTurnHead={handleTurnHead} />
    </div>
  )
}
export default VideoInfoArgs
