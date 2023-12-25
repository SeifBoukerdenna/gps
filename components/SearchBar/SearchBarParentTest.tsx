import SearchBarArrival from './SearchBarArrival'
import SearchBarDeparture from './SearchBarDeparture'
import { useState } from 'react'

export default function Parent() {
    return (
        <div>
            <SearchBarDeparture />
            <br />
            <br />
            <SearchBarArrival />
        </div>
    )
}
