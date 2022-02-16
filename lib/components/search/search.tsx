import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  useKeyboard,
  KeyMod,
  KeyCode,
  useModal,
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
      <Modal
        {...bindings}
        py={0}
        px={0.75}
        wrapClassName="search-menu"
        positionClassName="search-position">
        <Input
          ref={ref}
          w="100%"
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
        :global(.search-menu ul),
        :global(.search-menu li) {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        :global(.search-menu .input-container.search-input) {
          border: none;
          border-radius: 0;
        }
        :global(.search-menu .input-container div.input-wrapper) {
          border: none;
          border-radius: 0;
        }
        :global(.search-menu .input-container .input-wrapper.hover) {
          border: none;
        }
        :global(.search-menu .input-container .input-wrapper:active) {
          border: none;
        }
        :global(div.search-position.position) {
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 500ms ease;
          width: 500px;
          height: auto;
        }
        :global(.search-menu.wrapper) {
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15), 0 -5px 20px 0 rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  )
}

export default Search
