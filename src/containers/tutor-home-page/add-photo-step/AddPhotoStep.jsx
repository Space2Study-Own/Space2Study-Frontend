import { useState } from 'react'
import { Box } from '@mui/material'
import './file-uploader.css'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import previewImage from '~/assets/img/guest-home-page/preview.png'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'

const AddPhotoStep = ({ btnsBox }) => {
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState()
  const fileReader = new FileReader()

  fileReader.onloadend = () => {
    setImageURL(fileReader.result)
  }

  const handleFileChange = (file) => {
    setImage(file)
    fileReader.readAsDataURL(file)
  }

  return (
    <Box sx={style.root}>
      <form className='file-uploader'>
        <DragAndDrop
          emitter={({ files, error }) => {
            if (!error && files.length > 0) {
              handleFileChange(files[0])
            }
          }}
          validationData={{ maxQuantityFiles: 1 }}
        >
          <img
            alt='PhotoPreview'
            className='file-uploader__preview'
            src={imageURL ? imageURL : previewImage}
          />
          {!image && (
            <label htmlFor='file-loader-button'>
              Upload your profile photo
              <input
                accept='image/*'
                id='file-loader-button'
                onChange={(event) => handleFileChange(event.target.files[0])}
                style={{ display: 'none' }}
                type='file'
              />
            </label>
          )}
          <p> AddPhoto step</p>
          <p className='file-size'> Maximum file size - 10 Mb</p>
          <div className='file-uploader__file-name'>
            {image ? image.name : ''}
          </div>
          {btnsBox}
        </DragAndDrop>
      </form>
    </Box>
  )
}

export default AddPhotoStep
