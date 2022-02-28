
import React, { useState } from "react";

//redux
import {useDispatch} from 'react-redux'
import {getTools} from '../../store/actions'

//styles
import * as styled from '../styled-components/searchParams'

const initialState = {all: true, power: false, garden: false, hand: false}

const SearchParams = () => {
  const dispatch = useDispatch()

  const [active, setActive] = useState(initialState)

  const handleActive = newActive => {
    setActive({...initialState, ...newActive})
  }

  return (
    <styled.Container>
      <styled.Button
        active={active.all}
        onClick={() => {
          dispatch(getTools())
          handleActive({all: true})
        }}
      >
        All
      </styled.Button>
      <styled.Button
        active={active.power}
        onClick={() => {
          dispatch(getTools('Power Tool'))
          handleActive({power: true, all: false})
        }}
      >
        Power Tools
      </styled.Button>
      <styled.Button
        active={active.garden}
        onClick={() => {
          dispatch(getTools('Garden Tool'))
          handleActive({garden: true, all: false})
        }}
      >
        Garden Tools
      </styled.Button>
      <styled.Button
        active={active.hand}
        onClick={() => {
          dispatch(getTools('Hand Tool'))
          handleActive({hand: true, all: false})
        }}
      >
        Hand Tools
      </styled.Button>
    </styled.Container>
  )
}

export default SearchParams
