import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a languge" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup style={{background:"#fff"}}>
         
          <SelectItem value="apple">english</SelectItem>
          <SelectItem value="banana">العربية</SelectItem>
       
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
