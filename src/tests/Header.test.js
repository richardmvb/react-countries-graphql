import React from 'react'
import { render, cleanup } from '@testing-library/react';
import Header from '../components/Header';

afterEach(cleanup)

it("inserts text in Typography", () => {
    const { getByTestId } = render(<Header title="Richard App" />)

    expect(getByTestId("h6tag")).toHaveTextContent("Richard App")
})
