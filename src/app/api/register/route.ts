import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    const body = await request.json()
    const response = await axios.post(`${process.env.API_URL}/register`, body)
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json({ status: false, message: 'Registration failed' }, { status: 400 })
  }
}