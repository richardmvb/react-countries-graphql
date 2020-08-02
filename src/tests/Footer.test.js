import React from 'react'
import { render, cleanup } from '@testing-library/react';
import Footer from '../components/Footer';

afterEach(cleanup)

it("inserts text in Typography", () => {
    const { getByTestId } = render(<Footer author="Richard Matheus Vilas Boas" />)

    expect(getByTestId("body2tag")).toHaveTextContent("Richard Matheus Vilas Boas")
})
