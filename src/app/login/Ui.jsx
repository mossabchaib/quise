'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '../WitingAndError/Wait'
import Winners from '../raiting/winners'
import Review from '../raiting/raition_l'
import style from './style.module.css'
import styles from './login.module.css'

export default function Ui() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [language, setLanguage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "", name: "", language: "" })
  const router = useRouter()

  const handleLogin = async () => {
    let validationErrors = {}

    if (!email) validationErrors.email = "Email is required"
    if (!name) validationErrors.name = "Name is required"
    if (!language) validationErrors.language = "Please select a language"

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    localStorage.setItem('language', language)

    const storedData = localStorage.getItem('data')
    const parsedData = storedData ? JSON.parse(storedData) : {}

    localStorage.setItem('data', JSON.stringify({
      ...parsedData,
      [email]: { email, name, language }
    }))

    setIsLoading(false)
    router.push('/component')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-[url('../../public/TriviaWheelbackground2.png')] bg-cover bg-center">
      <div className={style.FormContainer}>
        <div className={style.logoContainer}>Welcome!</div>
        <div className={style.line}></div>

        <div className={style.form}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="font-medium text-lg">Email</label>
            <div className={styles.emailinput}>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="font-medium text-lg">Name</label>
            <div className={styles.emailinput}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Language Select */}
          <div className="mt-5">
            <label htmlFor="language" className="font-medium text-lg">Language</label>
            <div className="w-60">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="arabic">العربية</option>
              </select>
            </div>
            {errors.language && <p className="text-red-500 text-sm">{errors.language}</p>}
          </div>

          {/* Submit Button */}
          {!isLoading ? (
            <>
              <button
                type="submit"
                onClick={handleLogin}
                className="bg-[#7239d6] text-white px-4 py-2 rounded-md mt-4 w-full"
              >
                Next
              </button>
              <Review />
            </>
          ) : (
            <div className="mt-2">
              <Loader />
            </div>
          )}

          <Winners />
        </div>
      </div>
    </div>
  )
}
