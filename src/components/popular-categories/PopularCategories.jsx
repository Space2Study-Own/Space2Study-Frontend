import { Box, Typography } from '@mui/material'

import { styles } from './PopularCategories.styles'
import ShowCategories from './show-categories/ShowCategories'

const PopularCategories = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant='h5'>Popular Categories</Typography>
      <Typography sx={styles.description} variant='text'>
        Explore tutoring categories you are passionate about.
      </Typography>
      <ShowCategories />
    </Box>
  )
}

export default PopularCategories
