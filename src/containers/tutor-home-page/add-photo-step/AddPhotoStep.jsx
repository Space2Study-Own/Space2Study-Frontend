import { useStepsDataContext } from '~/context/steps-data-context'
import { Box } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'
import Typography from '@mui/material/Typography'

const AddPhotoStep = ({ btnsBox }) => {
  const { image, imageURL, handleFileChange, errorPhoto, previewImage } =
    useStepsDataContext()
  return (
    <Box data-testid='AddPhoto step' sx={style.root}>
      <DragAndDrop
        emitter={({ files, error }) => {
          if (!error && files.length > 0) {
            handleFileChange(files[0])
          }
        }}
        validationData={{ maxQuantityFiles: 1 }}
      >
        <Box data-testid='AddPhoto-step' sx={style.previewContainer}>
          <img
            alt='AddPhoto step'
            src={imageURL ?? previewImage}
            style={style.previewImage}
          />
        </Box>
      </DragAndDrop>
      <Box sx={style.bottomBox}>
        <Box>
          <FileUploader
            buttonText='Upload your profile photo'
            emitter={({ files, error }) => {
              if (!error && files.length > 0) {
                handleFileChange(files[0])
              }
            }}
            validationData={{ maxQuantityFiles: 1 }}
          />
          <Box>
            {image ? image.name : ''}
            <Typography
              color='error'
              data-testid='ErrorPhoto'
              variant='caption'
            >
              {errorPhoto}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: 'auto' }}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
