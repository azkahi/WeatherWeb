import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Command } from "cmdk"
import React from "react"
import "styles/dropdown.autocomplete.css"

interface AutoCompleteProps {
  items: string[]
  onClick?: (item: string) => void
}

const DropdownAutoComplete = ({ items, onClick }: AutoCompleteProps) => {
  const handleItem = (item: string) => {
    onClick?.(item)
  }

  if (items.length === 0) {
    return <Command.Empty className="p-4">No results found.</Command.Empty>
  } else {
    return (
      <>
        {items.map((item: string) => (
          <Command.Item key={item} onSelect={(value) => handleItem(value)} className="p-4">{item}</Command.Item>
        ))}
      </>
    )
  }
}

export default DropdownAutoComplete
