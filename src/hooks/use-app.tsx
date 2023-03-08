import { useState } from 'react'

import data from '@/data/skill-rune.json'

function useApp() {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState({
    id: 0,
    class: "",
    image: "",
    skill: {
      type: "",
      name: "",
      usability: "welp, maybe you can use it for get rune fragment."
    }
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    searchRune(keyword)
  }
  function searchRune(keyword: string) {
    const rune = data.find((rune) => rune.skills.some((skill) => skill.name.toLowerCase() === keyword.toLowerCase()))
    if (rune) {
      setResult({
        id: rune.id,
        class: rune.class,
        image: rune.image,
        skill: rune.skills.find((skill) => skill.name.toLowerCase() === keyword.toLowerCase())!
      })
    } else {
      alert(`We can't find ${keyword}`)
    }
  }

  return {
    data: {
      result
    },
    methods: {
      handleChange,
      handleSubmit
    }
  }
}

export default useApp
