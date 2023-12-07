import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HashLink from '~/components/hash-link/HashLink'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import useInputVisibility from '~/hooks/use-input-visibility'
import { guestRoutes } from '~/router/constants/guestRoutes'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'
const SignupForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
  // closeModal
}) => {
  const { t } = useTranslation()
  const { privacyPolicy, termOfUse } = guestRoutes
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)
  const { authLoading } = useSelector((state) => state.appMain)

  const handleOnAgreementChange = () => {
    setIsAgreementChecked((prev) => !prev)
  }

  const policyAgreement = (
    <Box sx={styles.box}>
      <Typography variant='subtitle2'>{t('signup.iAgree')}</Typography>
      <Typography
        component={HashLink}
        // onClick={closeModal}
        sx={styles.underlineText}
        to={termOfUse.path}
        variant='subtitle2'
      >
        {t('common.labels.terms')}
      </Typography>
      <Typography sx={{ ml: '5px' }} variant='subtitle2'>
        {t('signup.and')}
      </Typography>
      <Typography
        // component={HashLink}
        // onClick={closeModal}
        sx={styles.underlineText}
        to={privacyPolicy.path}
        variant='subtitle2'
      >
        {t('common.labels.privacyPolicy')}
      </Typography>
    </Box>
  )

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Box sx={{ display: { md: 'block', lg: 'flex' }, gap: '15px' }}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />

        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>

      <AppTextField
        data-testid={'email'}
        disabled
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        disabled
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        disabled
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <Box sx={styles.checkboxContainer}>
        <FormControlLabel
          control={<Checkbox />}
          disabled // add "disabled" for disabling checkbox checking
          label={policyAgreement}
          labelPlacement='end'
          onChange={handleOnAgreementChange}
          sx={styles.checkboxLabel}
          value={isAgreementChecked}
        />
      </Box>

      <AppButton
        disabled={!isAgreementChecked}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
