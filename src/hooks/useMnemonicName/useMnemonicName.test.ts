import { getRandomName, useMnemonicName, useMnemonicSafeName } from '.'
import { renderHook } from '@/tests/test-utils'
import { chainBuilder } from '@/tests/builders/chains'

const mockChain = chainBuilder().build()

// Mock useCurrentChain hook
jest.mock('@/hooks/useChains', () => ({
  useCurrentChain: () => mockChain,
}))

describe('useMnemonicName tests', () => {
  it('should generate a random name', () => {
    expect(getRandomName()).toMatch(/^[a-z-]+-[a-z]+$/)
    expect(getRandomName()).toMatch(/^[a-z-]+-[a-z]+$/)
    expect(getRandomName()).toMatch(/^[a-z-]+-[a-z]+$/)
  })

  it('should work as a hook', () => {
    const { result } = renderHook(() => useMnemonicName())
    expect(result.current).toMatch(/^[a-z-]+-[a-z]+$/)
  })

  it('should work as a hook with a noun param', () => {
    const { result } = renderHook(() => useMnemonicName('test'))
    expect(result.current).toMatch(/^[a-z-]+-test$/)
  })

  it('should change if the noun changes', () => {
    let noun = 'test'
    const { result, rerender } = renderHook(() => useMnemonicName(noun))
    expect(result.current).toMatch(/^[a-z-]+-test$/)

    noun = 'changed'
    rerender()
    expect(result.current).toMatch(/^[a-z-]+-changed$/)
  })

  it('should return a random safe name', () => {
    const { result } = renderHook(() => useMnemonicSafeName())
    const regex = new RegExp(`^[a-z-]+-${mockChain.chainName.toLowerCase()}-safe$`)
    expect(result.current).toMatch(regex)
  })
})
