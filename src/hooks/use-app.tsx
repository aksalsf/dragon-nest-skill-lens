import { useState } from 'react'

import data from '@/data/skills.json'
import placeholder from '@/assets/png/placeholder.png'

interface Result {
  id: number
  class: string
  image: string
  skill: {
    type: string
    name: string
    usability: string
  }
}

function useApp() {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState<Result[]>([{
    id: 0,
    class: "",
    image: placeholder,
    skill: {
      type: "",
      name: "",
      usability: "trash"
    }
  }])

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
      setResult([{
        id: 0,
        class: "",
        image: placeholder,
        skill: {
          type: "",
          name: "",
          usability: "trash"
        }
      }])
      alert("Please enter a keyword")
      return
    }

    const resultByEquality = data.find((char) => char.skills.some((skill) => isEquals(trimmedKeyword, skill.name)))
    if (resultByEquality) {
      setResult([{
        id: resultByEquality.id,
        class: resultByEquality.class,
        image: resultByEquality.image,
        skill: resultByEquality.skills.find((skill) => isEquals(trimmedKeyword, skill.name))!
      }])
      return
    }

    const resultByInclusion = data.filter((char) => char.skills.some((skill) => isIncludes(trimmedKeyword, skill.name)))
    if (resultByInclusion.length > 0) {
      setResult(resultByInclusion.map((char) => ({
        id: char.id,
        class: char.class,
        image: char.image,
        skill: char.skills.find((skill) => isIncludes(trimmedKeyword, skill.name))!
      })))
      return
    }

    const resultByStartsWith = data.filter((char) => char.skills.some((skill) => isStartsWith(trimmedKeyword, skill.name)))
    if (resultByStartsWith.length > 0) {
      setResult(resultByStartsWith.map((char) => ({
        id: char.id,
        class: char.class,
        image: char.image,
        skill: char.skills.find((skill) => isStartsWith(trimmedKeyword, skill.name))!
      })))
      return
    }

    const resultByEndsWith = data.filter((char) => char.skills.some((skill) => isEndsWith(trimmedKeyword, skill.name)))
    if (resultByEndsWith.length > 0) {
      setResult(resultByEndsWith.map((char) => ({
        id: char.id,
        class: char.class,
        image: char.image,
        skill: char.skills.find((skill) => isEndsWith(trimmedKeyword, skill.name))!
      })))
      return
    }

    setResult([{
      id: 0,
      class: "",
      image: placeholder,
      skill: {
        type: "",
        name: "",
        usability: "trash"
      }
    }])
    alert("No result found for " + keyword)
  }
  function generateUsabilityDescription(usability: string) {
    switch (usability) {
      case "alternative":
        return "Alternative skill you can choose for rune, but don't choose it for lunar jade."
      case "godly":
        return "This is the best skill for your class! You should use it!"
      default:
        return "I don't recommend you choose it for rune or lunar jade."
    }
  }

  return {
    data: {
      result
    },
    methods: {
      handleChange,
      handleSubmit,
      generateUsabilityDescription
    }
  }
}

export default useApp
