import React from 'react'
import style from './wait.module.css'
// export default function Wait() {
//   return (
//     <div className={style.loader}>
//     <div className={`${style.justifycontentcenter} ${style.jimuprimaryloading}`}></div>
//   </div>
//   )
// }
// components/Loader.jsx


export default function Wait() {
  return (
    // components/Loader.jsx
  <svg className={style.loader } viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
    <circle
      className={style.active}
      pathLength="360"
      fill="transparent"
      strokeWidth="32"
      cx="192"
      cy="192"
      r="176"
    ></circle>
    <circle
      className={style.track}
      pathLength="360"
      fill="transparent"
      strokeWidth="32"
      cx="192"
      cy="192"
      r="176"
    ></circle>
  </svg>
  )
}
