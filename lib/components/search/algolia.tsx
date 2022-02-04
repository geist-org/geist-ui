import React, { useEffect, useRef, useState } from 'react'
import algolia from 'algoliasearch'
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
} from 'components'
import { flattenArray, AlgoliaAPIHit, focusNextElement } from './helper'
import SearchItems, { SearchItemsRef } from './search-items'
import { useRouter } from 'next/router'

const ONLY_READ_KEY = '57ba52e34e92f5a8ef171de0522950d8'

const Algolia = () => {
  const theme = useTheme()
  const router = useRouter()
  const [preventHover, setPreventHover, preventHoverRef] = useCurrentState<boolean>(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const itemsRef = useRef<SearchItemsRef | null>(null)
  const [state, setState] = useState<Array<AlgoliaAPIHit>>([])
  const { bindings, setVisible } = useModal(false)
  const { bindings: inputBindings, setState: setInput, state: input } = useInput('')
  const index = useRef(algolia('N9SHCFMBD3', ONLY_READ_KEY))

  useKeyboard(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      ref.current?.focus()
      window.clearTimeout(timer)
    }, 0)
  }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

  useEffect(() => {
    if (!index.current) return
    if (!input) {
      return setState([])
    }
    setPreventHover(true)
    index.current
      .multipleQueries([
        {
          indexName: 'geist-ui-en-us',
          query: input,
          params: {
            hitsPerPage: 8,
          },
        },
      ])
      .then(res => {
        const allHits = res.results.map(r => r.hits)
        const hits = flattenArray<AlgoliaAPIHit>(allHits)
        setState(hits)
      })
      .catch(() => {
        setState([])
      })
  }, [input])
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
    router.push(url)
    setVisible(false)
    const timer = setTimeout(() => {
      setState([])
      setInput('')
      window.clearTimeout(timer)
    }, 400)
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
      <Modal {...bindings} py={0} px={0} wrapClassName="algolia-search">
        <div className="title">
          <Text font="12px" span>
            ESC to close
          </Text>
        </div>
        <Input
          ref={ref}
          w="100%"
          h="50px"
          font="20px"
          placeholder="Type Component to search"
          className="search-input"
          clearable
          {...inputBindings}
        />
        <SearchItems
          preventHoverHighlightSync={preventHover}
          ref={itemsRef}
          hits={state}
          onSelect={selectHandler}
        />
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
        .container:global(.input-container input) {
          color: ${theme.palette.violet};
          font-weight: 500;
        }
        .container:global(.backdrop .content) {
          position: absolute !important;
          top: 100px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          transition: all 500ms ease !important;
        }
        .container:global(.wrapper.algolia-search) {
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15), 0 -5px 20px 0 rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  )
}

export default Algolia
