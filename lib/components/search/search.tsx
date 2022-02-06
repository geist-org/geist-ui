import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  useKeyboard,
  KeyMod,
  KeyCode,
  useModal,
  Text,
  Input,
  useTheme,
  useInput,
  useCurrentState,
  Divider,
} from 'components'
import { focusNextElement, search, SearchResults } from './helper'
import SearchItems, { SearchItemsRef } from './search-items'
import { useRouter } from 'next/router'
import useLocale from 'lib/use-locale'

const Search: React.FC<unknown> = () => {
  const theme = useTheme()
  const router = useRouter()
  const { locale } = useLocale()
  const [preventHover, setPreventHover, preventHoverRef] = useCurrentState<boolean>(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const itemsRef = useRef<SearchItemsRef | null>(null)
  const [state, setState] = useState<SearchResults>([])
  const { bindings, setVisible, visible } = useModal(false)
  const { bindings: inputBindings, setState: setInput, state: input } = useInput('')

  const cleanAfterModalClose = () => {
    setVisible(false)
    const timer = window.setTimeout(() => {
      setState([])
      setInput('')
      itemsRef.current?.scrollTo(0, 0)
      setPreventHover(true)
      window.clearTimeout(timer)
    }, 400)
  }

  useKeyboard(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      ref.current?.focus()
      window.clearTimeout(timer)
    }, 0)
  }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

  useEffect(() => {
    if (!input) return setState([])
    setPreventHover(true)
    setState(search(input, locale))
    itemsRef.current?.scrollTo(0, 0)
  }, [input])

  useEffect(() => {
    if (visible) return
    cleanAfterModalClose()
  }, [visible])

  useEffect(() => {
    const eventHandler = () => {
      if (!preventHoverRef.current) return
      setPreventHover(false)
    }
    document.addEventListener('mousemove', eventHandler)
    return () => {
      document.removeEventListener('mousemove', eventHandler)
    }
  }, [])

  const selectHandler = (url: string) => {
    if (url.startsWith('http')) return window.open(url)
    router.push(url)
    setVisible(false)
  }

  const { bindings: KeyBindings } = useKeyboard(
    event => {
      const isBack = event.keyCode === KeyCode.UpArrow
      focusNextElement(
        itemsRef.current,
        () => {
          setPreventHover(true)
        },
        isBack,
      )
    },
    [KeyCode.DownArrow, KeyCode.UpArrow],
    {
      disableGlobalEvent: true,
    },
  )

  return (
    <div className="container" {...KeyBindings}>
      <Modal {...bindings} py={0} px={0.75} wrapClassName="search-menu">
        <Input
          ref={ref}
          w="100%"
          h="unset"
          font="1.125rem"
          py={0.75}
          placeholder="Search a component"
          className="search-input"
          clearable
          {...inputBindings}
        />
        {state.length > 0 && (
          <>
            <Divider mt={0} mb={1} />
            <SearchItems
              preventHoverHighlightSync={preventHover}
              ref={itemsRef}
              data={state}
              onSelect={selectHandler}
            />
          </>
        )}
      </Modal>
      <style jsx>{`
        .title {
          width: 100%;
          color: ${theme.palette.background};
          background-color: ${theme.palette.violet};
          display: flex;
          justify-content: flex-end;
          padding: 0 10px;
          user-select: none;
        }
        .container {
          visibility: hidden;
        }
        .container:global(ul),
        .container:global(li) {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .container:global(.input-container.search-input) {
          border: none;
          border-radius: 0;
        }
        .container:global(.input-container div.input-wrapper) {
          border: none;
          border-radius: 0;
        }
        .container:global(.input-container .input-wrapper.hover) {
          border: none;
        }
        .container:global(.input-container .input-wrapper:active) {
          border: none;
        }
        .container:global(.backdrop .content) {
          position: absolute !important;
          top: 100px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          transition: all 500ms ease !important;
          width: 500px;
        }
        .container:global(.wrapper.search-menu) {
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15), 0 -5px 20px 0 rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  )
}

export default Search
