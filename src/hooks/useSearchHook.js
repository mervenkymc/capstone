import React from "react"
export const useSearchingHook = (array) => {
  const [searchedObjOfArray, setSearchedObjOfArray] = React.useState([])
  const [isSearching, setIsSearching] = React.useState(false)

  const searchForValue = (valueThatSearch) => {
    if (valueThatSearch.length === 0) {
      setIsSearching(false)
      setSearchedObjOfArray([])
      return
    }
    setIsSearching(true)
    const newArr = array.filter((obj) => {
      if (obj.title) {
        return (
          obj.title.toLowerCase().includes(valueThatSearch) ||
          obj.title.includes(valueThatSearch)
        )
      }
    })

    setSearchedObjOfArray(newArr)
  }

  return [searchForValue, searchedObjOfArray, isSearching]
}
