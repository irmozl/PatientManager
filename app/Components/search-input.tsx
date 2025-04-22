"use client"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5"
import { useRef } from "react"
import { useSearchQueryStore } from "../Hooks/useSearchQueryStore"

export default function SearchInput() {
  const {setQuery, query } = useSearchQueryStore()
  const inputRef = useRef<HTMLInputElement>(null)

  console.log(query)

  return (
    <div className="relative border flex items-center gap-4 rounded-lg p-1 py-[4px] h-11">
        <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by first name or last name"
            className="text-slate-400  placeholder-slate-100 h-10 shadow-none border-none w-80"
            type="text"
        />
    
    {query.trim().length > 0 ? (
        <IoCloseOutline
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            className="text-slate-400 text-xl absolute top-[12px] right-5 cursor-pointer"
            />
          ) :(
            <FaSearch className="text-slate-400 absolute top-[13px] right-5" />
          )}
          </div>
    )
  }

 

