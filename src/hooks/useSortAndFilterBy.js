import React from "react"
export const useSortAndFilterBy = (initalArr) => {
  const [sortedData, setSortedData] = React.useState([])
  const [isSorting, setIsSorting] = React.useState(false)
  const [sortedType, setSortedType] = React.useState("ascString")
  const filterBy = (criteria, findValue) => {
    setIsSorting(true)
    const res = sortedData.filter((obj) => obj[criteria] === findValue)
    return res
  }

  const sortBy = () => {
    setIsSorting(true)
    if (sortedType === "ascNum") {
      const res = initalArr.sort((f, s) => f.popularity - s.popularity)
      setSortedData([...res])
      return res
    }
    if (sortedType === "descNum") {
      const res = initalArr.sort((f, s) => s.popularity - f.popularity)

      setSortedData([...res])
      return res
    }
    if (sortedType === "ascString") {
      const res = initalArr.sort((f, s) => {
        if (f.title < s.title) {
          return -1
        }
        if (f.title > s.title) {
          return 1
        }
        return 0
      })

      setSortedData([...res])
      return res
    }
    if (sortedType === "dscString") {
      const res = initalArr.sort((f, s) => {
        if (f.title < s.title) {
          return 1
        }
        if (f.title > s.title) {
          return -1
        }
        return 0
      })

      setSortedData([...res])
    }

    if (sortedType === "ascDate") {
      const res = initalArr.sort(
        (f, s) => new Date(f.release_date) - new Date(s.release_date)
      )
      setSortedData([...res])
    }
    if (sortedType === "descDate") {
      const res = initalArr.sort(
        (f, s) => new Date(s.release_date) - new Date(f.release_date)
      )
      setSortedData([...res])
    }

    return
  }
  return [
    sortedData,
    filterBy,
    sortBy,
    isSorting,
    setIsSorting,
    setSortedType,
    sortedType
  ]
}
