'use client'

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useEffect, useState } from 'react'

export const useSignalR = (activityId: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)

  useEffect(() => {
    if (!activityId || activityId === '') return

    let isMounted = true

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNALR_URL}?activityId=${activityId}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    const startConnection = async () => {
      if (!isMounted) return
      try {
        await newConnection.start()
        if (isMounted) {
          console.log('Connected to SignalR Hub!')
          setConnection(newConnection)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!isMounted) return
        if (
          err.message?.includes('Failed to start the connection') ||
          err.message?.includes('stopped during negotiation')
        ) {
          return
        }
        console.error('SignalR Connection Error: ', err)
        setTimeout(() => {
          if (isMounted) startConnection()
        }, 5000)
      }
    }

    const startTimer = setTimeout(() => {
      startConnection()
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(startTimer)
      if (newConnection.state === 'Connected') {
        newConnection.stop().catch(() => {})
      }
    }
  }, [activityId])

  return connection
}
