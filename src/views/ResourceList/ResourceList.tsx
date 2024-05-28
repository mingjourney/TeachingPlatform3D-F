import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { Button, Modal, UploadProps } from 'antd'
import cos from '@/utils/cos'
import pptImg from '@/assets/images/ppt.png'
import wordImg from '@/assets/images/WORD.png'
import excelImg from '@/assets/images/excel.png'
import videoImg from '@/assets/images/video.png'

import {
  FileExcelOutlined,
  FilePptOutlined,
  FileWordOutlined,
  InboxOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const bucket = '36038098-1323630637'
const region = 'ap-nanjing'

const fileType = [
  { id: 0, title: '所有文件类型', icon: <InboxOutlined />, extension: '' },
  { id: 1, title: 'PPT', icon: <FilePptOutlined />, extension: 'pptx' },
  { id: 2, title: 'Word', icon: <FileWordOutlined />, extension: 'doc' },
  { id: 4, title: 'Excel', icon: <FileExcelOutlined />, extension: 'xlsx' },
  { id: 3, title: 'Video', icon: <VideoCameraOutlined />, extension: 'mp4' }
]
const fileTypeImgs = {
  pptx: pptImg,
  doc: wordImg,
  docx: wordImg,
  xlsx: excelImg,
  xls: excelImg,
  mp4: videoImg
}

import { message, Upload } from 'antd'

const { Dragger } = Upload

const customUpload = ({ onProgress, onError, onSuccess, file }) => {
  const uploadFile = () => {
    const filename = 'TeachingPlatform3D-File/' + file.name
    const blob = file

    cos.uploadFile(
      {
        Bucket: bucket,
        Region: region,
        Key: filename,
        Body: blob,
        SliceSize: 1024 * 1024 * 5,
        onProgress: function (info) {
          onProgress({
            percent: Math.floor(info.percent * 100)
          })
        }
      },
      function (err, data) {
        if (err) {
          onError(err)
        } else {
          onSuccess(data)
        }
      }
    )
  }

  uploadFile()
}
const downloadFile = (filename) => {
  const key = `TeachingPlatform3D-File/${filename}` // Adjust based on your object storage structure

  cos.getObject(
    {
      Bucket: bucket,
      Region: region,
      Key: key,
      ResponseContentType: 'application/octet-stream', // Forces the browser to download
      DataType: 'blob' // Ensures that the response is handled as a Blob
    },
    function (err, data) {
      if (err) {
        console.error('Download error:', err)
        message.error('File download failed')
      } else {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([data.Body]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename) // Set the filename for download
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url) // Free up memory
        message.success('下载成功')
      }
    }
  )
}

const props: UploadProps = {
  name: 'file',
  multiple: true,
  customRequest: customUpload,

  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}
const ResourceList = () => {
  const navigate = useNavigate()

  const [selectedFileType, setSelectedFileType] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const [resources, setResources] = useState([])

  function generateLargeBlob() {
    const size = 1 * 1024 // 10 MB
    const bytes = new Uint8Array(size) // Create a typed array of the correct size
    for (let i = 0; i < size; i++) {
      bytes[i] = 'a'.charCodeAt(0) // Fill array with 'a' character bytes
    }
    return new Blob([bytes], { type: 'application/zip' })
  }
  function uploadFile() {
    var filename = 'TeachingPlatform3D-File/1mb.zip'
    var blob = generateLargeBlob()
    cos.uploadFile(
      {
        Bucket: bucket, // Bucket 格式：test-1250000000
        Region: region,
        Key: filename,
        Body: blob,
        SliceSize: 1024 * 1024 * 5, // 大于5mb才进行分块上传
        onProgress: function (info) {
          var percent = Math.floor(info.percent * 10000) / 100
          var speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100
          // logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        }
      },
      function (err, data) {
        // logger.log('uploadFile:', err || data);
      }
    )
  }
  function getFileList() {
    cos.getBucket(
      {
        Bucket: bucket, // Bucket 格式：test-1250000000
        Region: region,
        Prefix: 'TeachingPlatform3D-File/'
      },
      function (err, data) {
        if (err) {
          console.log('err', err)
        } else {
          setResources(formatResource(data.Contents))
        }
      }
    )
  }

  // const httpUpload = (res) => {

  // }

  const formatResource = (list) => {
    const prefixes = 'TeachingPlatform3D-File/'
    return list.slice(1).map((item) => {
      const { Key, LastModified, Size } = item
      const file = Key.replace(prefixes, '')
      const [fileName, fileType] = file.split('.')
      const time = moment(LastModified).format('YYYY-MM-DD HH:mm:ss')
      return { fileName, fileType, time, Size, file }
    })
  }
  useEffect(() => {
    // uploadFile()
    getFileList()
  }, [])
  const handleFileTypeClick = (fileType) => {
    setSelectedFileType(fileType)
  }
  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value)
  }, 200)
  const uploadResource = () => {
    setOpen(true)
    // navigate('uploadResource')
  }
  const [open, setOpen] = useState(false)
  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
    //
  }
  return (
    <div className="flex flex-col gap-2 justify-between">
      <Modal
        open={open}
        title="上传文件"
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     取消
        //   </Button>,
        //   <Button key="submit" type="primary" onClick={handleOk}>
        //     上传
        //   </Button>
        // ]}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
      <div className="py-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="h-8 flex items-center justify-center font-bold text-base mb-3">
              文件类型：
            </span>
            {fileType.map((fileType) => (
              <div
                key={fileType.id}
                onClick={() => handleFileTypeClick(fileType.id)}
                className={`flex gap-1 h-8 py-2  px-3 bg-sky-100 rounded-lg text-center flex items-center justify-center cursor-pointer ${
                  fileType.id === selectedFileType ? 'bg-sky-200' : 'bg-sky-100'
                }`}
              >
                <span>{fileType.icon}</span>
                <span> {fileType.title}</span>
              </div>
            ))}
          </div>
          <Button type="primary" onClick={uploadResource}>
            上传资源
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
          {resources
            .filter(
              (resource) =>
                selectedFileType === 0 ||
                resource.fileType ===
                  fileType.find((type) => type.id === selectedFileType)
                    ?.extension
            )
            .map((resource) => (
              <div
                key={resource.fileName}
                className="flex items-center gap-4 border rounded-2xl p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="w-12">
                  <img src={fileTypeImgs[resource.fileType]}></img>
                </div>
                <div className="">
                  {' '}
                  <h3 className="text-lg font-semibold">{resource.fileName}</h3>
                  <p className="text-gray-600">
                    <span>大小：</span>
                    <span>{resource.Size} KB</span>
                  </p>
                  <button
                    onClick={() => downloadFile(resource.file)}
                    className="text-blue-500 hover:underline"
                  >
                    下载
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ResourceList
