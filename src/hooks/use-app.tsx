import { useState } from 'react'

import data from '@/data/skills.json'
import placeholder from '@/assets/png/placeholder.png'

function useApp() {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState({
    id: 0,
    class: "",
    image: "",
    skill: {
      type: "",
      name: "",
      usability: "trash"
    }
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    searchCharacter(keyword)
  }
  function isEquals(keyword: string, skill: string) {
    return keyword.toLowerCase() === skill.toLowerCase()
  }
  function isIncludes(keyword: string, skill: string) {
    return skill.toLowerCase().includes(keyword.toLowerCase())
  }
  function isStartsWith(keyword: string, skill: string) {
    const splitSkill = skill.split(" ")
    return splitSkill.some((word) => word.toLowerCase().startsWith(keyword.toLowerCase()))
  }
  function isEndsWith(keyword: string, skill: string) {
    const splitSkill = skill.split(" ")
    return splitSkill.some((word) => word.toLowerCase().endsWith(keyword.toLowerCase()))
  }
  function searchCharacter(keyword: string) {
    const trimmedKeyword = keyword.trim()

    if (trimmedKeyword === "") {
      setResult({
        id: 0,
        class: "",
        image: placeholder,
        skill: {
          type: "",
          name: "",
          usability: "trash"
        }
      })
      alert("Please enter a keyword")
      return
    }

    const resultByEquality = data.find((char) => char.skills.some((skill) => isEquals(trimmedKeyword, skill.name)))
    if (resultByEquality) {
      setResult({
        id: resultByEquality.id,
        class: resultByEquality.class,
        image: resultByEquality.image,
        skill: resultByEquality.skills.find((skill) => isEquals(trimmedKeyword, skill.name))!
      })
      return
    }

    const resultByInclusion = data.find((char) => char.skills.some((skill) => isIncludes(trimmedKeyword, skill.name)))
    if (resultByInclusion) {
      setResult({
        id: resultByInclusion.id,
        class: resultByInclusion.class,
        image: resultByInclusion.image,
        skill: resultByInclusion.skills.find((skill) => isIncludes(trimmedKeyword, skill.name))!
      })
      return
    }

    const resultByStartsWith = data.find((char) => char.skills.some((skill) => isStartsWith(trimmedKeyword, skill.name)))
    if (resultByStartsWith) {
      setResult({
        id: resultByStartsWith.id,
        class: resultByStartsWith.class,
        image: resultByStartsWith.image,
        skill: resultByStartsWith.skills.find((skill) => isStartsWith(trimmedKeyword, skill.name))!
      })
      return
    }

    const resultByEndsWith = data.find((char) => char.skills.some((skill) => isEndsWith(trimmedKeyword, skill.name)))
    if (resultByEndsWith) {
      setResult({
        id: resultByEndsWith.id,
        class: resultByEndsWith.class,
        image: resultByEndsWith.image,
        skill: resultByEndsWith.skills.find((skill) => isEndsWith(trimmedKeyword, skill.name))!
      })
      return
    }

    setResult({
      id: 0,
      class: "",
      image: placeholder,
      skill: {
        type: "",
        name: "",
        usability: "trash"
      }
    })
    alert("No result found for " + keyword)
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
