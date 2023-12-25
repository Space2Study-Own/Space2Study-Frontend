import { Box, Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import findStudentImg from '~/assets/img/tutor-home-page/become-tutor/icons8-box-50.png'
import SearchIcon from '@mui/icons-material/Search'

import { styles } from './TutorHomeHeader.styles'

const TutorHomeHeader = () => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftBox}>
        <Typography variant='h4'>
          {t('tutorHomePage.findStudentBlock.title.tutor')}
        </Typography>
        <Typography sx={styles.description} variant='text'>
          {t('tutorHomePage.findStudentBlock.description')}
        </Typography>
        <Box sx={styles.searchBox}>
          <TextField
            InputProps={{ startAdornment: <SearchIcon /> }}
            placeholder={t('tutorHomePage.findStudentBlock.label')}
            sx={styles.inputText}
          />
          <Button variant='contained'>
            {t('tutorHomePage.findStudentBlock.button')}
          </Button>
        </Box>
      </Box>
      <Box component='img' src={findStudentImg} />
    </Box>
  )
}

export default TutorHomeHeader
