import React from 'react'
import { render } from '@testing-library/react'
import Episodes from '../components/Episodes.js'

test('Episodes renders without errors', () => {
    render(<Episodes episodes={[]}/>)
})

