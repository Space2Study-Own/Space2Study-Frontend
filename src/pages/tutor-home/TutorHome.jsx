import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import TutorHomeHeader from '~/components/tutor-home-header/TutorHomeHeader'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <TutorHomeHeader />
      <PopularCategories />
    </PageWrapper>
  )
}

export default TutorHome
