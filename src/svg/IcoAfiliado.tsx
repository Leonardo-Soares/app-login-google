import React from 'react'
import { Path, Svg, Circle } from 'react-native-svg'

export default function IcoAfiliado() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Usuário esquerdo */}
      <Circle cx="8" cy="7" r="3.5" fill="#2F009C" />
      <Path 
        d="M3 20C3 17.2386 5.23858 15 8 15C10.7614 15 13 17.2386 13 20" 
        stroke="#2F009C" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* Usuário direito */}
      <Circle cx="16" cy="7" r="3.5" fill="#2F009C" />
      <Path 
        d="M11 20C11 17.2386 13.2386 15 16 15C18.7614 15 21 17.2386 21 20" 
        stroke="#2F009C" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
    </Svg>
  )
}
