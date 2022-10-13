import React, { useState } from 'react'
import { Button, Image, Pressable } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <Pressable onPress={() => setOpen(true)} >
            <Image
                style={{ left: -30, width: 23, height: 23 }}
                source={require('../src/images/calendar.png')}
                />
            <DatePicker
                modal
                locale='pt-br'
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            </Pressable>
        </>
    )
}