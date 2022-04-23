/* eslint-disable */
import { render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MOCKED_DOG, MOCKED_FAV_DOG } from './mocks'
import reducer, { dogAction } from '../store/dogs'
import { App } from '../App'

const server = setupServer(
  rest.get('/images/search', (req, res, ctx) => {
    return res(ctx.json(MOCKED_DOG))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Dogs Timeline', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({ dogs: [], favDogs: [], isLoading: false })
  })

  test('should set isLoading', () => {
    const previousState = { dogs: [], favDogs: [], isLoading: false }
    const expectedState = { dogs: [], favDogs: [], isLoading: true }

    expect(reducer(previousState, dogAction.setLoader(true))).toEqual(
      expectedState
    )
  })
  test('should fetch dogs', async () => {
    const previousState = { dogs: [], favDogs: [], isLoading: false }
    const expectedState = { dogs: MOCKED_DOG, favDogs: [], isLoading: false }

    expect(reducer(previousState, dogAction.setDogs(MOCKED_DOG))).toEqual(
      expectedState
    )
  })
  test('should fetch dogs', async () => {
    const previousState = { dogs: [], favDogs: [], isLoading: false }
    const expectedState = {
      dogs: [],
      favDogs: MOCKED_FAV_DOG,
      isLoading: false,
    }

    expect(
      reducer(previousState, dogAction.setFavDogs(MOCKED_FAV_DOG))
    ).toEqual(expectedState)
  })
})
