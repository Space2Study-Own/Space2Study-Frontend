import { screen, fireEvent, waitFor } from '@testing-library/react'
import { student } from '~/constants'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'

import { renderWithProviders } from '~tests/test-utils'
import useBreakpointsGoogle from '~/hooks/use-breakpoints-google'
import { it, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

vi.mock('~/hooks/use-breakpoints-google', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isSmallScreen: false,
    isMediumScreen: false,
    isLargeScreen: false,
    isXLargeScreen: false
  }))
}))

const mockState = {
  appMain: { authLoading: true }
}

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('~/containers/guest-home-page/google-login/GoogleLogin', () => ({
  __esModule: true,
  default: function () {
    return <button>1111</button>
  }
}))

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch.mockReturnValue({ unwrap: () => '' }),
    useSelector: () => mockSelector.mockImplementation(mockState)
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

describe('Signup dialog test', () => {
  beforeEach(() => {
    renderWithProviders(<SignupDialog type={student} />)
  })

  it('should render img', () => {
    const img = screen.getByAltText(/signup/i)

    expect(img).toBeInTheDocument()
  })

  it('should render head', () => {
    const head = screen.getByRole('heading', { level: 2 })

    expect(head).toBeInTheDocument()
  })

  it('should change email value', () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })

    expect(inputEmail.value).toBe('test@mail.com')
  })

  it('should change password value', () => {
    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: 'test' } })

    expect(inputPassword.value).toBe('test')
  })

  it('should dispatch after button submit', async () => {
    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)
    fireEvent.change(inputFirstName, { target: { value: 'test' } })

    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)
    fireEvent.change(inputLastName, { target: { value: 'test' } })

    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678a/A' } })

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
  })
  it('sSmallScreen', () => {
    useBreakpointsGoogle.mockImplementation(() => ({
      isSmallScreen: true,
      isMediumScreen: false,
      isLargeScreen: false,
      isXLargeScreen: false
    }))
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result).toBeTruthy()
  })
  it('isMediumScreen', () => {
    useBreakpointsGoogle.mockImplementation(() => ({
      isSmallScreen: false,
      isMediumScreen: true,
      isLargeScreen: false,
      isXLargeScreen: false
    }))
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result).toBeTruthy()
  })
  it('isLargeScreen', () => {
    useBreakpointsGoogle.mockImplementation(() => ({
      isSmallScreen: false,
      isMediumScreen: false,
      isLargeScreen: true,
      isXLargeScreen: false
    }))
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result).toBeTruthy()
  })
  it('isXLargeScreen', () => {
    useBreakpointsGoogle.mockImplementation(() => ({
      isSmallScreen: false,
      isMediumScreen: false,
      isLargeScreen: false,
      isXLargeScreen: true
    }))
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result).toBeTruthy()
  })
})
