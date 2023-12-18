import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { TextField } from "@radix-ui/themes"
import { Command } from 'cmdk'
import React, { FormEvent } from "react"

interface SearchBarProps {
  withIcon?: boolean
  OnTextChange?: (text: string) => void
  OnBlur?: () => void
  OnFocus?: () => void
}

function SearchBar({ withIcon, OnTextChange, OnBlur, OnFocus }: SearchBarProps) {
  return (
    <Command.Input className="flex flex-row items-center border-b gap-4 p-4" />
  )
}

export default SearchBar
